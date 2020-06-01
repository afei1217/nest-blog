/*
 * @Author: afei
 * @Date: 2020-05-29 18:02:00
 * @Description: 基础的dto类
 */

export class BaseDto {
    // 这里的model只能传Object 且里面的值不能有Function
    constructor(metadata: string[] = [], model: {}) {
        metadata.forEach(key => {
            const value = model[key];
            if (!(value instanceof Function)) {
                this[key] = model[key]
            }
        });
    }

    // 将值为undefined 和 null 的属性删除掉
    senderShake() {
        for (const key in this) {
            const value = this[key];
            if (value === undefined || value === null) delete this[key];
        }
    }

    // 获取当前实例更新的sql片段
    get updateSql() {
        const sql = [];
        for (const key in this) {
            if (key === 'id') continue;
            sql.push(`${key}='${this[key]}'`);
        }
        return sql.join(',');
    }
}