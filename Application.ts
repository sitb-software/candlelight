import * as http from 'http';
import * as cluster from 'cluster';
import * as domain from 'domain';
import * as os from 'os';

import Route from './modals/Route';
import Context from './modals/Context';

import routerFactory from './core/routerFactory';

import handle404 from './http/handle404';
import handleRequest from './http/handleRequest';
import handleException from './http/handleException';
import findRequestRoute from './http/findRequestRoute';

import findQueryString from './middleware/findQueryString';
import findBodyParams from './middleware/findBodyParams';
import findPathVariable from './middleware/findPathVariable';
import handleAction from './middleware/handleAction';
import { IncomingMessage, ServerResponse } from 'http';

export interface Config {
  controllers?: Object;
  hostname?: string,
  port?: number;
  template?: 'react';
  onException?: HandleException
}

export type Middleware = (req: Context, next: (req: Context) => void) => void;

export type HandleException = (req: IncomingMessage, res: ServerResponse, route: Route, ex: Error) => void;

/**
 * Http服务工具
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/5
 */
class Application {

  private firstMiddleware: Array<Middleware> = [
    findQueryString,
    findPathVariable,
    findBodyParams
  ];

  private middleware: Array<Middleware> = [];

  private lastMiddleware: Array<Middleware> = [
    handleAction
  ];

  private routes: Array<Route>;

  private port: number;
  private hostname: string;
  private template: string;
  private onException: HandleException;

  server;

  /**
   * @param controllers Web控制器
   * @param hostname host
   * @param port 端口
   * @param template view 使用的模板技术
   * @param onException 发生异常时处理函数
   */
  constructor({controllers = {}, hostname = '0.0.0.0', port = 3000, template, onException}: Config) {
    this.routes = routerFactory(controllers);
    this.hostname = hostname;
    this.port = port;
    this.template = template;
    this.onException = onException;
  }

  /**
   * 添加一个中间件
   * @param middleware 请求处理中间件
   */
  use(middleware: Middleware): void {
    this.middleware.push(middleware);
  }

  /**
   * 运行程序
   *
   */
  start() {
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);
      if (process.env.DEBUG) {
        cluster.fork();
      } else {
        os.cpus().forEach(() => {
          cluster.fork();
        });
      }

      cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
      });

      cluster.on('disconnect', (worker) => {
        console.log(`worker ${worker.process.pid} disconnect!`);
        cluster.fork();
      });
    } else {
      this.createServer();
      console.log(`Worker ${process.pid} started`);
    }
  }

  protected createServer() {
    this.server = http.createServer(((request, response) => this.handleRequest(request, response)));
    this.server.listen(this.port, this.hostname, () => {
      console.log(`HTTP Server start on ${this.hostname}:${this.port}`);
    });
  }

  protected handleRequest(request, response) {
    const route = findRequestRoute(request, this.routes);
    if (!route) {
      console.log(`route not found. method=${request.method}, url=${request.url}`);
      handle404(request, response);
      return;
    }
    console.log('find action route.', request.method, request.url);
    const requestDomain = domain.create();
    requestDomain.on('error', err => {
      console.error(err.message, err);
      // Note: We're in dangerous territory!
      // By definition, something unexpected occurred,
      // which we probably didn't want.
      // Anything can happen now!  Be very careful!
      try {
        // make sure we close down within 30 seconds
        const killtimer = setTimeout(() => {
          process.exit(1);
        }, 30000);
        // But don't keep the process open just for that!
        killtimer.unref();

        // stop taking new requests.
        this.server.close();

        // Let the master know we're dead.  This will trigger a
        // 'disconnect' in the cluster master, and then it will fork
        // a new worker.
        cluster.worker.disconnect();

        if (this.onException) {
          this.onException(request, response, route, err);
        } else {
          handleException(request, response, route, err);
        }
      } catch (er2) {
        // oh well, not much we can do at this point.
        console.error(`Error sending 500! ${er2.stack}`);
      }
    });

    requestDomain.add(request);
    requestDomain.add(response);

    requestDomain.run(() => handleRequest({
      request,
      response,
      route,
      template: this.template,
      middlewareStack: [
        ...this.firstMiddleware,
        ...this.middleware,
        ...this.lastMiddleware
      ]
    }));

  }

}

export default Application;
