/*
 * @Author: afei
 * @Date: 2020-05-09 17:47:09
 * @Description: HTTP相关
 */


export type TMessage = string;
export type TExceptionOption = TMessage | {
    message: TMessage,
    errorMessage?: any,
    code: string|number
}

// HTTP 状态返回
export interface IHttpResponseBase {
    code: string|number;
    message: TMessage;
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
    code: string|number,
    message: TMessage,
    error?: any;
    debug?: string
}

// HTTP success 返回
export type THttpSuccessResponse<T> = IHttpResponseBase & {
    result: T;
};

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;