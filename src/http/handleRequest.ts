import Context from './Context';
/**
 * 处理请求
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default ({request, response, route, middlewareStack}) => {
  let ctx = new Context(request, response);
  ctx.route = route;
  const next = function () {
    let middleware = middlewareStack.shift();
    if (middleware) {
      middleware(ctx, next);
    }
  };
  next();
};
