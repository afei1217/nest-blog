import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { environment, isDevMode } from '@app/app.environment';

import * as APP_CONFIG from '@app/app.config';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
const color = c => isDevMode ? c : '';
Object.assign(global.console, {
    log: (...args) => log('[log]', '[nodepress]', ...args),
    warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[nodepress]', ...args),
    info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[nodepress]', ...args),
    error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[nodepress]', ...args),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_CONFIG.APP.PORT);
}
bootstrap().then(() => {
    console.log(APP_CONFIG.APP.ROOT_PATH + '/**/*.model.ts');
    console.info(`NodePress Run！port at ${APP_CONFIG.APP.PORT}, env: ${environment}`);
});
