/*
 * @Author: afei
 * @Date: 2020-05-29 17:04:48
 * @Description: 根服务
 */
import { getManager, EntityManager } from 'typeorm';

export class BaseService {
    protected sqlManager: EntityManager;
    constructor() {
        this.sqlManager = getManager();
    }
}