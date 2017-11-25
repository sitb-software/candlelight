import { Range } from './Range';
/**
 * @author Sean(sean.snow@live.com) createAt 17-11-17
 */


/**
 * 验证支持的数据类型
 */
export enum Type {
  string,
  number,
  boolean,
  url,
  email,
  tel,
  enumerable,
  object,
  array
}


/**
 * @param value 当前值
 * @param data 所有数据
 */
export type Validator = (value: any, source: any, rule: Rule) => boolean;

export interface Rule {
  key: string
  type?: Type
  required?: boolean
  pattern?: RegExp
  range?: Range
  min?: number
  max?: number
  length?: number
  validator?: Validator
  /**
   * 如果type为object或者array,可以使用该字段配置其中的值
   */
  fields?: Array<Rule>
  values?: Array<any>
  message?: string,
  messages?: Array<string>
}
