import HttpMethod from '../http/HttpMethod';

/**
 * @param path http 请求路径
 * @param method http 请求方法 {@link HttpMethod}
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default ({path, method = HttpMethod.GET}): Function => {
  return function (target, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    if (!target.handlers) {
      target.handlers = {};
    }

    if (propertyKey) {
      console.log(`注解在方法[${propertyKey}]上`);
      target.handlers[propertyKey] = {
        path,
        method
      };
    } else {
      target.prototype.path = path;
    }

    return descriptor;
  };
}
