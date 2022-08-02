import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import * as uuid from 'uuid';

export enum TypeFile {
  AUDIO = 'audio',
  IMAGE = 'image',
}
@Injectable()
export class FileService {
  constructor() {} // @InjectModel(Comment.name) private commentModel: Model<CommentDocument>, // @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  async create(type: TypeFile, file): Promise<string> {
    try {
      const fileExtention = file.orifinalname.split('.').pop();
      const fileName = uuid.v4() + fileExtention;
      const filePath = path.resolve(__dirname, '..', 'upload');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async delete() {}
}
