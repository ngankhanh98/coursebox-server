import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const options = new DocumentBuilder()
    .setTitle('Coursebox API')
    .setDescription('This APIs for Coursebox')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  

  await app.listen(3000||process.env.PORT);
}
bootstrap();
