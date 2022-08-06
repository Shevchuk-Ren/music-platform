import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AlbumModule } from './modules/album/album.module';
import { FileModule } from './modules/file/file.module';
import { TrackModule } from './modules/track/track.module';

const config = new ConfigService();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'upload'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb+srv://${config.get('DATABASE_USER')}:${config.get('DATABASE_PASSWORD')}@cluster0.sg3s1.mongodb.net/?retryWrites=true&w=majority`),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
})
export class AppModule {}
