/**
 * @author Sean(sean.snow@live.com) createAt 17-11-17
 */
import { ParameterFrom } from "../modals/ParameterType";

function check(target: any, propertyKey: string, descriptor: number) {
  if (!target.handlers) {
    target.handlers = {};
  }
  if (!target.handlers[propertyKey]) {
    target.handlers[propertyKey] = {};
  }
  if (!target.handlers[propertyKey].parameterTypes) {
    target.handlers[propertyKey].parameterTypes = {};
  }
}

/**
 * 用于获取request中的body参数
 * @author Sean(sean.snow@live.com) createAt 17-11-17
 */
export const RequestBody = (target: any, propertyKey: string, descriptor: number) => {
  check(target, propertyKey, descriptor);
  target.handlers[propertyKey].parameterTypes[descriptor] = {
    type: ParameterFrom.BODY
  };
};

export const RequestParam = (key: string, required: boolean = true) => (target: any, propertyKey: string, descriptor: number) => {
  check(target, propertyKey, descriptor);
  target.handlers[propertyKey].parameterTypes[descriptor] = {
    key,
    required
  };
};

export const PathVariable = (key: string) => (target: any, propertyKey: string, descriptor: number) => {
  check(target, propertyKey, descriptor);
  target.handlers[propertyKey].parameterTypes[descriptor] = {
    type: ParameterFrom.PATH,
    key
  };
};
