import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, TypeFile } from '../file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/tracks.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>, 
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>, 
    private fileService: FileService,
  ) {}
  async getAllTracks(count = 10, offset = 0) {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }
  async getOne(id: ObjectId) {
    const trackById = await this.trackModel.findById(id).populate('comments');
    return trackById;
  }
  async searchTrack(query: string) {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
  async createTrack(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = await this.fileService.create(TypeFile.AUDIO, audio);
    const imagePath = await this.fileService.create(TypeFile.PICTURE, picture);

    const createdTrack = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: imagePath,
    });
    return createdTrack;
  }
  async deleteTrack(id: ObjectId): Promise<ObjectId> {
    const trackDeletedById = await this.trackModel.findByIdAndDelete(id);
    await this.fileService.delete(TypeFile.AUDIO, trackDeletedById.audio);
    await this.fileService.delete(TypeFile.PICTURE, trackDeletedById.picture);
    return trackDeletedById._id;
  }
  async listenTrack(id: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}
