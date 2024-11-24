import {
  Controller,
  ParseFilePipe,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  logger = new Logger('UploadController');
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      await this.uploadService.upload(file.originalname, file.buffer);
      this.logger.log('File uploaded successfully on Bucket');
      return { message: 'File uploaded successfully' };
    }
   catch (error) {
      this.logger.error(error);
      return { message: 'File upload failed' };
    }
  }
}
