import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${config.get('DATABASE_USER')}:${config.get(
        'DATABASE_PASSWORD',
      )}@cluster0.sg3s1.mongodb.net/?retryWrites=true&w=majority`,
    ),
    TrackModule,
    AlbumModule,
  ],
})
export class AppModule {}
