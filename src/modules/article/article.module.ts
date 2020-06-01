/*
 * @Author: afei
 * @Date: 2020-06-01 17:38:58
 * @Description: 文章模块
 */

import { Module } from "@nestjs/common";
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService]
})
export class UserModule { }