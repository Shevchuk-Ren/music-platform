import { Controller, Get, Post, Body } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  getAllAlbums() {}
  getOneAlbum() {}
  createAlbum() {}
  deleteAlbum() {}
}