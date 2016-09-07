import Context from '../http/Context';
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/7
 */
export default (ctx: Context) => {
  const result = ctx.route.handler(ctx);
  if (ctx.route.isRestful) {
    ctx.response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    ctx.response.end(typeof result === 'string' ? result : JSON.stringify(result));
  }
}
