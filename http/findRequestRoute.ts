import {IncomingMessage} from 'http';
import {parse} from 'url';
import Route from '../modals/Route';
import HttpUtils from '../utils/HttpUtils';
import HttpMethod from './HttpMethod';

/**
 * 从路由列表中查找于当前请求匹配的路由信息
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default (req: IncomingMessage, routes: Array<Route>)=> {
  let url = parse(req.url);
  let pathname = url.pathname;
  return routes.find(route => {
    let pathReg = HttpUtils.getPathReg(route.uri);
    return req.method === HttpMethod[route.method] && pathReg.test(pathname);
  });
}
