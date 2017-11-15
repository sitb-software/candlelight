import Context from '../modals/Context';
import * as contentTypeUtils from 'content-type';
import { parse } from 'url';
import { DEFAULT_CHARSET } from '../core/Constants';
import { HttpMessageNotReadableException } from '../error/HttpMessageNotReadableException';

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

  let contentType = {
    type: '',
    parameters: {
      charset: DEFAULT_CHARSET
    }
  };

  try {
    contentType = contentTypeUtils.parse(req);
  } catch (e) {
    console.log(`解析content-type失败: ${e.message}`);
  }

  getRawBody(req, {
    length: req.headers['content-length'],
    encoding: contentType.parameters.charset || DEFAULT_CHARSET
  }, (err, res) => {
    if (err) {
      console.error('解析body失败', err);
      throw new Error(err);
    }
    if (res) {
      let body = null;
      if (contentType.type === 'application/x-www-form-urlencoded') {
        body = parse(`/?${res}`, true).query;
        ctx.originalBody = decodeURI(res);
      } else if (contentType.type.includes('json')) {
        ctx.originalBody = res;
        try {
          body = JSON.parse(res);
        } catch (e) {
          console.error(`解析JSON格式body失败 -> ${e.message}`, e);
          throw new HttpMessageNotReadableException(e.message);
        }
      }
      ctx.body = body;
    }
    next();
  });
};
