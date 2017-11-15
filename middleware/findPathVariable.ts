import {parse} from 'url';
import Context from '../modals/Context';
import HttpUtils from '../utils/HttpUtils';
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/7
 */
export default (ctx: Context, next)=> {
  const req = ctx.request;
  const route = ctx.route;
  ctx.pathVariable = HttpUtils.getPathVariable(route.uri, parse(req.url).pathname);
  next();
};
