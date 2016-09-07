import {parse} from 'url';
import Context from '../http/Context';
import HttpUtils from '../utils/HttpUtils';
/**
 * 解析URL中的参数
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default (ctx: Context, next) => {
  const req = ctx.request;
  let queryString = parse(req.url).query;
  if (queryString) {
    ctx.queryString = HttpUtils.queryString2Obj(queryString);
  }
  next();
};
