import { ServerResponse } from 'http';
import Route from '../modals/Route';

/**
 * 处理系统发生的异常信息
 * @param req http request
 * @param res http response
 * @param route 路由信息
 * @param e 异常信息
 */
export default (req, res: ServerResponse, route: Route, e) => {
  console.log('发生异常，默认异常处理');
  res.writeHead(500, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({
    method: route.method.toString(),
    uri: route.uri,
    message: e.message
  }));
}
