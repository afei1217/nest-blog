/*
 * @Author: afei
 * @Date: 2020-05-08 12:45:48
 * @Description: 文章表
 */

import {
    Column,
    Entity,
} from 'typeorm';
import { BaseModel } from '../base/baseModel'

@Entity('articles')
export class ArticleModel extends BaseModel {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    abstract: string;

    @Column()
    cover: string;

    @Column()
    avatar: string;

    @Column()
    user_id: number;

    @Column({
        comment: '标签'
    })
    tag: string;

    @Column()
    category: string;

    @Column({
        nullable: false,
        default: 0,
        comment: '发布状态'
    })
    state: number;

    @Column({
        nullable: false,
        default: 0,
        comment: '被点赞数'
    })
    likes_count: number;

    @Column({
        nullable: false,
        default: 0,
        comment: '阅读量'
    })
    reads_count: number;

}