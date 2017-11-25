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
   * 参数是否是必须的
   */
  required?: boolean
  /**
   * 参数key
   */
  key?: string,

  /**
   * 参数校验函数
   * @param source 元数据
   */
  valid?: (source: any) => void
}
