import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
console.log(process.env.MONGO_DB, 'con');
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://renat_shev:Rbkkth2022@cluster0.sg3s1.mongodb.net/?retryWrites=true&w=majority'
    ),
    TrackModule,
    AlbumModule,
  ],
})
export class AppModule {}
