import { parse } from 'url';
import Context from '../modals/Context';

/**
 * 解析URL中的参数
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default (ctx: Context, next) => {
  const req = ctx.request;
  let queryString = parse(req.url, true).query;
  if (queryString) {
    ctx.query = queryString;
  }
  next();
};
