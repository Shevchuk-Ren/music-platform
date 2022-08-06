import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './schemas/tracks.schema';
import { TrackService } from './track.service';

@ApiTags('tracks')
@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @ApiQuery({ name: 'count' })
  @ApiQuery({ name: 'offset' })
  @Get('all')
  getAllTracks(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAllTracks(count, offset);
  }
  @ApiQuery({ name: 'query' })
  @Get('search')
  searchTrack(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.searchTrack(query);
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }
  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'picture',
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
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
  ): Promise<Track> {
    const { picture, audio } = files;
    return this.trackService.createTrack(dto, picture[0], audio[0]);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: ObjectId): Promise<ObjectId> {
    return this.trackService.deleteTrack(id);
  }
  @Post('listen/:id')
  listenTrack(@Param('id') id: ObjectId): Promise<void> {
    return this.trackService.listenTrack(id);
  }
  @Post('comment/add')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }
}
