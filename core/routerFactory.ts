import Route from '../modals/Route';

/**
 * 解析控制器，得到路由信息
 * @param controllers 控制器
 * @return {Array<Route>} 路由列表
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default (controllers): Array<Route> => {
  let routes = [];
  Object.keys(controllers).forEach(key => {
    const Controller = controllers[key];
    if (!Controller.isController) {
      return;
    }
    const {isRestful, handlers, path = ''} = Controller.prototype;
    const instance = new Controller();
    Object.keys(handlers).forEach(k => {
      const {path: appPath, method, parameterTypes} = handlers[k];
      routes.push({
        uri: `${path}${appPath}`,
        method: method,
        parameterTypes,
        isRestful,
        handler: instance[k],
      });
    });
  });
  return routes;
};
