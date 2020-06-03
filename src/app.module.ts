import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as APP_CONFIG from '@app/app.config';

import { UserModule } from 'modules/user/user.module'
import { ArticleModule } from 'modules/article/article.module'
import { FileModule } from 'modules/file/file.module'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: APP_CONFIG.MYSQLDB.HOST,
            port: APP_CONFIG.MYSQLDB.PORT,
            username: APP_CONFIG.MYSQLDB.USER,
            password: APP_CONFIG.MYSQLDB.PASSWORD,
            database: APP_CONFIG.MYSQLDB.DB_NAME,
            entities: [APP_CONFIG.APP.ROOT_PATH + '/**/*.model.js'],
            synchronize: true,
        }),
        UserModule,
        ArticleModule,
        FileModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
