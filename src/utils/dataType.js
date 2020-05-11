/*
 * @Author: afei
 * @Date: 2020-05-11 11:31:52
 * @Description: 数据类型判断
 */

const stringTag = '[object String]';
const nullTag = '[object Null]';
const undefinedTag = '[object Undefined]';

/**
 * 将对象转成该类型对应的tag eg: "[object String]"
 * @param {*} value
 */
const objectToString = value => {
    return Object.prototype.toString.call(value);
}

/**
 * 获取对象的tag
 * @example
 * _.baseGetTag('1');   // "[object String]"
 * _.baseGetTag(1);     // "[object Number]"
 * _.baseGetTag(false); // "[object Boolean]"
 */
const baseGetTag = value => {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return objectToString(value);
}

/**
 * 检测一个值 是否是类似对象
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 * _.isObjectLike({});  // => true
 * _.isObjectLike([1, 2, 3]); // => true
 * _.isObjectLike(_.noop); // => false
 * _.isObjectLike(null);// => false
 */
export const isObjectLike = value => {
    return value != null && typeof value == 'object';
}

/**
 * 判断是否是数组
 */
export const isArray = Array.isArray;

/**
 * 检测一个值 是否是string类型
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 * _.isString('abc');   // => true
 * _.isString(1);   // => false
 *
 * 解释一下 为何用这么复杂的检测方式
 * eg:
 * typeof 'a';      //"string"
 * typeof new String('a');  //"object"
 */

export const isString = value => {
    return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}