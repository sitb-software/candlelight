/**
 * 参数来源
 */
export enum ParameterFrom {
  BODY,
  PATH
}

/**
 * @author Sean(sean.snow@live.com) createAt 17-11-17
 */
export default interface ParameterType {
  type?: ParameterFrom
  /**
   *
   */
  required?: boolean
  /**
   * 参数key
   */
  key?: string
}
