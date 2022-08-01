import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/tracks.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async getAllTracks() {
    const tracks = await this.trackModel.find();
    return tracks;
  }
  async getOne(id: ObjectId) {
    const trackById = await this.trackModel.findById(id).populate('comments');
    return trackById;
  }
  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const createdTrack = await this.trackModel.create({ ...dto, listens: 0 });
    return createdTrack;
  }
  async deleteTrack(id: ObjectId): Promise<ObjectId> {
    const trackDeletedById = await this.trackModel.findByIdAndDelete(id);
    return trackDeletedById._id;
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}