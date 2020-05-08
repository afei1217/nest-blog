/*
 * @Author: afei
 * @Date: 2020-05-08 12:46:09
 * @Description: mysql table的基础实体
 */


import {
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';
export abstract class BaseModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
        comment: '创建时间',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
        comment: '最后更新时间',
    })
    updatedAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'delete_at',
        comment: '删除时间',
    })
    deleteAt: Date;
}
