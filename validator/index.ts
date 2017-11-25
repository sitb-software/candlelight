import { Rule } from '../modals/ParamsValid';
import * as validator from './validators';
import { ArgumentNotValidException } from '../error/ArgumentNotValidException';

/**
 * 参数校验
 * @author 田尘殇Sean(sean.snow@live.com) create at 2017/11/25
 */
export default function (source: any, rules: Array<Rule>) {
  rules.forEach(rule => {
    if (rule.validator) {
      rule.validator(source[rule.key], source, rule);
    } else {
      try {
        validator[rule.type] && validator[rule.type](source[rule.key], source, rule);
      } catch (e) {
        throw new ArgumentNotValidException({key: rule.key, message: e.message});
      }
    }
  });
}
