import * as pathToRegexp from 'path-to-regexp';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
class HttpUtils {

  /**
   * object 对象转换为URL queryString
   * from:
   * {
   *  name: 'Sean',
   *  age: 19
   * }
   * to:
   * name=Sean&age=19
   * @param params
   * @return {String}
   */
  static obj2queryString(params: Object): string {
    if (!params) {
      return '';
    }
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  /**
   * 查询字符串转换为对象
   * @param queryString url中的参数
   * @return {{}} 结果
   */
  static queryString2Obj(queryString: string): Object {
    if (!queryString) {
      return {};
    }
    let result = {};
    queryString.split('&').forEach(param => {
      let tmp = param.split('=');
      result[tmp[0]] = tmp[1];
    });
    return result;
  }

  /**
   * 获取路径中的变量
   * @param uri 带变量的uri
   * @param pathname 路径
   * @return {Object}
   */
  static getPathVariable(uri: string, pathname: string): Object {
    if (!uri || !pathname) {
      return {};
    }
    pathname = decodeURI(pathname);
    let names = uri.match(/:[\w]+/g);
    if (!names) {
      return {};
    }
    names = names.map(name => name.substring(1));
    let pathVar = pathToRegexp(uri).exec(pathname);
    let result = {};
    for (let i = 0; i < names.length; i++) {
      result[names[i]] = pathVar[i + 1];
    }
    return result;
  }

  static getPathReg(uri) {
    return pathToRegexp(uri);
  }

}

export default HttpUtils;
