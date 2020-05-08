/*
 * @Author: afei
 * @Date: 2020-05-08 11:27:31
 * @Description: 环境配置
 */

export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');
export const isTestMode = Object.is(environment, 'test');

export default {
    isDevMode,
    isProdMode,
    isTestMode,
    environment,
};
