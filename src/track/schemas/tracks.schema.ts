import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from './comment.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
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
  listens: number;

  @Prop({ 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);