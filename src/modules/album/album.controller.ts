import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';

@ApiTags('albums')
@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  getAllAlbums() {}
  getOneAlbum() {}
  createAlbum() {}
  deleteAlbum() {}
}
