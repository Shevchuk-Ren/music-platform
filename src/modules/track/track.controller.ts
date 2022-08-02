import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './schemas/tracks.schema';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get('all')
  getAllTracks() {
    return this.trackService.getAllTracks();
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }
  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
      {
        name: 'audio',
        maxCount: 1,
      },
    ]),
  )
  createTrack(
    @Body() dto: CreateTrackDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
  ): Promise<Track> {
    return this.trackService.createTrack(dto);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: ObjectId): Promise<ObjectId> {
    return this.trackService.deleteTrack(id);
  }
  @Post('comment/add')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }
}
