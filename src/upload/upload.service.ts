import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  private readonly bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
  constructor(private readonly configService: ConfigService) {}

  /**
   * Uploads a file to an S3 bucket.
   *
   * @param {string} fileName - The name of the file to be uploaded.
   * @param {Buffer} file - The file content to be uploaded.
   * @returns {Promise<void>} - A promise that resolves when the upload is complete.
   */
  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file,
      }),
    );
  }
}
