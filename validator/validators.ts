import { Rule } from '../modals/ParamsValid';
import * as Pattern from '../utils/Pattern';
import validator from './index';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2017/11/25
 */

export function string(value, source, rule: Rule) {
  if (rule.required && (!value || value.length === 0)) {
    throw new Error(`${rule.key} is required.`);
  }

  if (rule.length && value.length !== rule.length) {
    throw new Error(`${rule.key} length must be ${rule.length}`)
  }

  if (rule.pattern && rule.pattern.test(value)) {
    throw new Error(`${rule.key} don't match ${rule.pattern}`)
  }
}

export function number(value, source, rule: Rule) {
  const result = parseInt(value);
  if (isNaN(result)) {
    throw new Error(`${rule.key} must be number.`)
  }
  if (rule.range && (result > rule.range.max || result < rule.range.min)) {
    throw new Error(`${rule.key} must between ${rule.range.min} and ${rule.range.max}`)
  }

  if (rule.min && result < rule.min) {
    throw new Error(`${rule.key} must be greater than ${rule.min}`)
  }

  if (rule.max && result > rule.max) {
    throw new Error(`${rule.key} must be smaller than ${rule.max}`);
  }
}

export function boolean(value, source, rule: Rule) {
  switch (value) {
    case 't':
    case 'true':
      source[rule.key] = true;
      break;
    case 'f':
    case 'false':
      source[rule.key] = false;
      break;
    default:
      throw new Error(`${rule.key} must be boolean`);
  }

}

export function url(value, source, rule: Rule) {
  if (!Pattern.url.test(value)) {
    throw new Error(`${rule.key} must be url`)
  }
}

export function email(value, source, rule: Rule) {
  if (!Pattern.url.test(value)) {
    throw new Error(`${rule.key} must be email`)
  }
}

export function tel() {

}

export function enumerable(value, source, rule: Rule) {
  const values: Array<any> = rule.values || [];
  if (!values.includes(value)) {
    throw new Error(`${rule.key} must be in ${rule.values}`);
  }
}

export function object(value, source, rule: Rule) {
  if (typeof value !== 'object') {
    throw new Error(`${rule.key} must be object`);
  }
  if (!rule.fields) {
    return;
  }

  try {
    validator(value, rule.fields);
  } catch (e) {
    throw new Error(`${rule.key}.${e.message}`);
  }

}

export function array(value, source, rule: Rule) {
  if (!Array.isArray(value)) {
    throw new Error(`${rule.key} must be array`);
  }
  if (!rule.fields) {
    return;
  }
  try {
    validator(value, rule.fields);
  } catch (e) {
    throw new Error(`${rule.key}.${e.message}`);
  }
}

