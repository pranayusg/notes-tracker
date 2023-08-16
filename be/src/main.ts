import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port =
    process.env.STAGE === 'dev'
      ? configService.get('APP_PORT')
      : process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Notes Management')
    .setDescription('Manage notes created by a user')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
