import HttpMethod from '../http/HttpMethod';

/**
 * @param path http 请求路径
 * @param method http 请求方法 {@link HttpMethod}
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default function RequestMapping({path, method = HttpMethod.GET}): Function {
  return function (target, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    if (!target.handlers) {
      target.handlers = {};
    }
    if (!target.handlers[propertyKey]) {
      target.handlers[propertyKey] = {};
    }

    if (propertyKey) {
      console.log(`注解在方法[${propertyKey}]上`);
      target.handlers[propertyKey].path = path;
      target.handlers[propertyKey].method = method;
    } else {
      target.prototype.path = path;
    }

    return descriptor;
  };
}


/**
 * get request
 * @param {string} path 路径
 * @constructor
 */
export const GetMapping = (path = '') => RequestMapping({path});

export const PostMapping = (path = '') => RequestMapping({path, method: HttpMethod.POST});

export const PutMapping = (path = '') => RequestMapping({path, method: HttpMethod.PUT});

export const PatchMapping = (path = '') => RequestMapping({path, method: HttpMethod.PATCH});

export const DeleteMapping = (path = '') => RequestMapping({path, method: HttpMethod.DELETE});
