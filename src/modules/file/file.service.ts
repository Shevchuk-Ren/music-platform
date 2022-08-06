import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

export enum TypeFile {
  AUDIO = 'audio',
  PICTURE = 'picture',
}
@Injectable()
export class FileService {
  constructor() {}
  async create(type: TypeFile, file) {
    try {
      const fileExtention = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtention;

      const filePath = path.resolve(__dirname, '..', 'upload', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async delete(type: TypeFile, fileName) {
    console.log(fileName);
    const filePath = path.resolve(__dirname, '..', 'upload', type);
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
    }
  }
}
