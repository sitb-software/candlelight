/**
 * @author Sean(sean.snow@live.com) createAt 17-11-17
 */
import { ParameterFrom } from "../modals/ParameterType";
import { Rule } from '../modals/ParamsValid';
import validator from '../validator';

function check(target: any, propertyKey: string, descriptor: number, data) {
  if (!target.handlers) {
    target.handlers = {};
  }
  if (!target.handlers[propertyKey]) {
    target.handlers[propertyKey] = {};
  }
  if (!target.handlers[propertyKey].parameterTypes) {
    target.handlers[propertyKey].parameterTypes = {};
  }
  if (!target.handlers[propertyKey].parameterTypes[descriptor]) {
    target.handlers[propertyKey].parameterTypes[descriptor] = {};
  }
  target.handlers[propertyKey].parameterTypes[descriptor] = {
    ...target.handlers[propertyKey].parameterTypes[descriptor],
    ...data
  }
}

/**
 * 用于获取request中的body参数
 * @author Sean(sean.snow@live.com) createAt 17-11-17
 */
export const RequestBody = (target: any, propertyKey: string, descriptor: number) => {
  check(target, propertyKey, descriptor, {
    type: ParameterFrom.BODY
  });
};

export const RequestParam = (key: string, required: boolean = true) => (target: any, propertyKey: string, descriptor: number) => {
  check(target, propertyKey, descriptor, {
    key,
    required
  });
};

export const PathVariable = (key: string) => (target: any, propertyKey: string, descriptor: number) => {
  check(target, propertyKey, descriptor, {
    type: ParameterFrom.PATH,
    key
  });
};


export function Valid(rules: Array<Rule>) {
  return (target, propertyKey: string, descriptor: number) => {
    check(target, propertyKey, descriptor, {
      valid: (source) => validator(source, rules)
    });
  }
}
