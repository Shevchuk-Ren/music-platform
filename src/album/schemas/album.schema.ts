import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop()
  comments: string;

  @Prop()
  listens: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
