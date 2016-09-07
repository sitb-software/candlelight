/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
interface Interceptor {
  preHandle(request, response): boolean;

  postHandle(request, response): void;
}

export default Interceptor;
