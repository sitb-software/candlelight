import * as http from 'http';
import Route from './http/Route';
import Context from './http/Context';
import handle404 from './http/handle404';
import handleRequest from './http/handleRequest';
import routerFactory from './http/routerFactory';
import findRequestRoute from './http/findRequestRoute';
import findQueryString from './middleware/findQueryString';
import findBodyParams from './middleware/findBodyParams';
import findPathVariable from './middleware/findPathVariable';
import handleAction from './middleware/handleAction';


const DEFAULT_CONFIG = {
  server: {
    port: 7000
  }
};

/**
 * Http服务工具
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/5
 */
class Application {

  private middleware: Array<(req: Context, next: (req: Context) => void) => void>;

  constructor() {
    this.middleware = [];
    this.middleware.push(findQueryString);
    this.middleware.push(findBodyParams);
    this.middleware.push(findPathVariable);
    this.middleware.push(handleAction);
  }

  /**
   * 添加一个中间件
   * @param middleware 请求处理中间件
   */
  use(middleware: (req: Context, next: (req: Context) => void) => void): void {
    this.middleware.push(middleware);
  }

  /**
   * 运行程序
   * @param controllers Web控制器
   * @param config 配置参数
   */
  run({controllers = {}, config = {server: {}}} = {}): void {
    const routes: Array<Route> = routerFactory(controllers);
    const app = http.createServer((request, response) => {
      const route = findRequestRoute(request, routes);
      if (route) {
        console.log('find action route.', request.method, request.url);
        handleRequest({request, response, route, middlewareStack: [].concat(this.middleware)});
      } else {
        console.log(`route not found. method=${request.method}, url=${request.url}`);
        handle404(request, response);
      }
    });

    const server = {
      ...DEFAULT_CONFIG.server,
      ...config.server
    };
    console.log(`server start on port [${server.port}]`);
    app.listen(server.port);
  }

}

export default Application;
