import { Rule } from '../modals/ParamsValid';
import * as validator from './validators';

/**
 * 参数校验
 * @author 田尘殇Sean(sean.snow@live.com) create at 2017/11/25
 */
export default function (source: any, rules: Array<Rule>) {
  rules.forEach(rule => {
    if (rule.validator) {
      rule.validator(source[rule.key], source, rule);
    } else {
      validator[rule.type] && validator[rule.type](source[rule.key], source, rule);
    }
  });
}
