/*
 * @Author: afei
 * @Date: 2020-05-09 11:43:10
 * @Description: api接口参数校验管道
 */
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ApiValidationError } from '@app/errors/apiValidation.error';

@Injectable()
export class ApiValidationPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        console.log('ApiValidationPipe', value, metatype)
        if (!metatype) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints).join(';')).join(';');
            throw new ApiValidationError(errorMessage);
        }
        return value
    }
}