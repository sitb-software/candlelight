import HttpMethod from '../http/HttpMethod';

/**
 * @param path http 请求路径
 * @param method http 请求方法 {@link HttpMethod}
 * @param requestBody 请求参数是否从body中获取
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default ({path, method = HttpMethod.GET, requestBody = false}) => {
  return function (target, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    if (!target.handlers) {
      target.handlers = {};
    }
    target.handlers[propertyKey] = {path, method, requestBody};
    return descriptor;
  };
}
