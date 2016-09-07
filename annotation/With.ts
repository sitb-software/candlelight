/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default (...interceptor) => {
  return function (target, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    return descriptor;
  };
}
