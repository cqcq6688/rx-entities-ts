import {
  Body,
  Controller,
  HttpException,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, fileFilter } from './file-upload.utils';
import { MagicUploadService } from './magic.upload.service';

@Controller()
export class MagicUploadController {
  constructor(private readonly uploadService: MagicUploadService) {}

  /**
   * 通用提交接口，语法示例：
   * {
   *   "model":"RxMedia",
   *   "file":...
   *   "folder":1
   * }
   * @returns
   */
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './public/uploads',
        filename: fileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  async postWithUpload(@UploadedFiles() files, @Body() body: any) {
    try {
      for (const file of files) {
        console.debug(file);
        const fileInfo = {} as any;
        fileInfo.originalname = file.originalname;
        fileInfo.filename = file.filename;
        fileInfo.mimetype = file.mimetype;
        fileInfo.path = file.path;
        fileInfo.size = file.size;
        body[file.fieldname] = fileInfo;
      }
      console.debug(body);
      //return await this.uploadService.post(body || {});
    } catch (error: any) {
      console.error('Upload error:', error);
      throw new HttpException(
        {
          status: 500,
          error: error.message,
        },
        500,
      );
    }
  }
}
