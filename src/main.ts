import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ApiValidationPipe } from '@app/pipes/apiValidation.pipe';
import { HttpExceptionFilter } from './filters/error.filter';
import { SuccessInterceptor } from '@app/interceptors/success.interceptor';

import { environment, isDevMode } from '@app/app.environment';

import * as APP_CONFIG from '@app/app.config';

// 替换 console 为更统一友好的
const { log, warn, info } = console;
const color = c => isDevMode ? c : '';
Object.assign(global.console, {
    log: (...args) => log('[log]', '[afpblog]', ...args),
    warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[af-blog]', ...args),
    info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[af-blog]', ...args),
    error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[af-blog]', ...args),
});

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 设置路由前缀
    app.setGlobalPrefix('v1');

    // 设置静态服务地址
    app.useStaticAssets(APP_CONFIG.FILE.UPLOAD_ROOT, {
        prefix: APP_CONFIG.FILE.API_PREFIX // 虚拟名称 http://localhost:3010/static/...png
    })

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ApiValidationPipe());
    app.useGlobalInterceptors(
        new SuccessInterceptor(new Reflector()),
    );
    await app.listen(APP_CONFIG.APP.PORT);
}
bootstrap().then(() => {
    console.info(`af-blog Run！port at ${APP_CONFIG.APP.PORT}, env: ${environment}`);
});
