# Coursebox

Find your next favorite course on Coursebox

## ⚒ Stack

NestJS + mySQL


## 📐 ERD Diagram

![](https://github.com/ngankhanh98/coursebox-server/blob/main/docs/erd.v0.1.png?raw=true)

- Teachers:
**A teacher** might have **n courses**.

- Courses:
**A course** is belong to **1 teacher**, have **n chapters**, classified to **n tags**
- Members:
**A member** can join **0..n courses**

## ❄ API endpoint
### Teacher
- [x] GET - /teachers
- [x] GET - /teachers/{teacher_id}
- [ ] GET - /teachers/me
- [x] POST - /teachers
- [x] PUT - /teachers/{teacher_id}
- [x] PATCH - /teachers/{teacher_id}
- [x] DELETE - /teachers/{teacher_id}
- [x] GET - /teachers/search?{title(course), tag, fullname}
### Course
- [ ] GET - /courses
- [ ] GET - /courses/{course_id}
- [ ] GET - /courses/search?{fullname(teacher), tag}
- [ ] POST - /courses
- [ ] PUT - /courses/{course_id}
- [ ] PATCH - /courses/{course_id}
- [ ] DELETE - /courses/{course_id}

### Member

- GET - /members
- GET - /members/me
- GET - /members/{member_id}
- GET - /members/search?{fullname}
- POST - /members
- PUT - /members/{member_id}
- PATCH - /members/{member_id}
- DELETE - /members/{member_id}

## Things to mind
- [ ] Swagger with standard description
- [ ] nestjsx/crud

## How can this built? 
and bugs with solutions
### TypeORM 
1. Install npm 
```bash 
$ npm install --save typeorm mysql
```
2. You can follow this [docs](https://docs.nestjs.com/recipes/sql-typeorm) to config the rest work to establish database connection
3. Or you want to have separate configuration
- Create `.env` with your connection string in root folder
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=coursebox
```
- Create a configuration by `registerAs`, `configs/database.config.ts`
```ts
import { registerAs } from '@nestjs/config';

export const localDBConfig = registerAs('localDB', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}));

```

- Create `database/` with `database.module.ts` and `database.provider.ts`. `DatabaseProvider` should dynamically import `ConfigModule` which will load your `localDB` configuration.
In `database.provider.ts`:
```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localDBConfig } from 'src/configs/database.config';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      load: [localDBConfig],
    }),
  ],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...configService.get('localDB'),
      cache: true,
      entities: ['"dist/**/*.entity{.ts,.js}"'],
    };
  },
});
```

In `database.provider.ts`:
```ts
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [DatabaseProvider],
})
export class DatabaseModule {
  constructor(private connection: Connection) {} // <-- `private` to declare and initialize connection immediately
}
```

#### ⚠ Attention
```log
[Nest] 1364   - 11/13/2020, 9:15:56 AM   [ExceptionHandler] No repory for "Teachers" was found. Looks like this entity is not regist in current "default" connection? +94ms
```
**Solution**
You need config hot reload properly
- Install
```bash
$ npm i --save-dev webpack-node-externals start-server-webpack-plugin webpack@4.44.1
```
- Create `webpack-hmr.config.js` with the content:
```js
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};
```

- To enable HMR, open the application entry file (main.ts) and add the following webpack-related instructions:
```ts

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```
- Modify package.json
```json
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js"
```

You're good to go!

😫 Webpack 5 doesn't compable to Nest's HMR, consider dowgrading Webpack (it's total a pain)

#### ⚠ Attendtion
```log
Repository not found
```
**Solution**
In database.provider.ts:
```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localDBConfig } from 'src/configs/database.config';
import { Teachers } from '../entities/teachers.entity';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      load: [localDBConfig],
    }),
  ],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...configService.get('localDB'),
      entities: [Teachers], // <-- this, instead of entities: ['"dist/*.entity{.ts, .js}"']
    };
  },
});

```

## Nestjsx/crud
Follow this [docs](https://github.com/nestjsx/crud/wiki/Controllers#install) and you would be fine