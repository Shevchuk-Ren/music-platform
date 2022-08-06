import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const config = new ConfigService();
    const PORT = config.get('PORT') || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () => console.log(`Srever started on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
