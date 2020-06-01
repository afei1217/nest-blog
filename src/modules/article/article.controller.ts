/*
 * @Author: afei
 * @Date: 2020-06-01 17:39:34
 * @Description: 文章控制器
 */

import { Controller, Get, Query, Post, Body, } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller('article')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) { }

    /**
     * 获取文章信息
     * @param params
     */
    @Get('detail')
    getUserInfoById(@Query() params): Promise<any> {
        const articleId = params.id;
        return this.articleService.getArticleInfoById(articleId);
    }

    /**
     * 更新文章信息
     * @param params
     */
    @Post('update')
    articleUpdate(@Body() body): Promise<any> {
        return this.articleService.articleUpdate(body);
    }

}