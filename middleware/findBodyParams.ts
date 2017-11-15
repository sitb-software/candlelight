import Context from '../modals/Context';
import * as contentTypeUtils from 'content-type';
import {parse} from 'url';

const getRawBody = require('raw-body');

/**
 * 解析请求中的表单参数
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2016/10/25
 */
export default (ctx: Context, next) => {
  const req = ctx.request;

  if (req.method === 'GET') {
    next();
    return;
  }

  const contentType = contentTypeUtils.parse(req);

  getRawBody(req, {
    length: req.headers['content-length'],
    encoding: contentType.parameters.charset || 'utf-8'
  }, (err, res) => {
    if (err) {
      console.error('解析body失败', err);
    }
    if (res) {
      let body = null;
      if (contentType.type === 'application/x-www-form-urlencoded') {
        body = parse(`/?${res}`, true).query;
        ctx.originalBody = decodeURI(res);
      } else if (contentType.type.includes('json')) {
        ctx.originalBody = res;
        body = JSON.parse(res);
      }
      ctx.body = body;
    }
    next();
  });
};
