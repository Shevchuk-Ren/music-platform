import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Track } from './tracks.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
