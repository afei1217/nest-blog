/*
 * @Author: afei
 * @Date: 2020-06-01 17:41:42
 * @Description: 文章服务
 */

/*
 * @Author: afei
 * @Date: 2020-05-09 13:55:32
 * @Description: 用户业务服务
 */

import { Injectable } from "@nestjs/common";
import { ApiError } from '@app/errors/api.error'
import { BaseService } from "../base/base.service";
import {
    ArticleUpdateDto
} from './article.dto'

const TABLE_NAME = 'articles'

@Injectable()
export class ArticleService extends BaseService {
    constructor() {
        super();
    }

    // 获取文章信息
    public async getArticleInfoById(articleId: number): Promise<any> {
        const findArticleByIdSql = `SELECT * FROM ${TABLE_NAME} WHERE id = '${articleId}'`
        const users = await this.sqlManager.query(findArticleByIdSql);
        if (users.length === 0) throw new ApiError(20101);
        return users[0];
    }

    // 更新文章内容
    public async articleUpdate(article: {}): Promise<any> {

        const updateDto: ArticleUpdateDto = new ArticleUpdateDto(article);

        // 1. 获取摘要和封面图

        // 将没有值的数据从当前实例上抖动下去；
        updateDto.senderShake();
        const updateValueSql = updateDto.updateSql;
        const updateSql = `UPDATE ${TABLE_NAME} SET ${updateValueSql} WHERE id=${updateDto.id}`;
        await this.sqlManager.query(updateSql);
        return Promise.resolve(updateDto.id);
    }
}