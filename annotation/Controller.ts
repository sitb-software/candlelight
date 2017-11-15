/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2016/10/25
 */
export default (target) => {
  target.isController = true;
  target.prototype.isRestful = false;
}

/**
 * rest controller
 * @param target
 * @constructor
 */
export const RestController = (target) => {
  target.isController = true;
  target.prototype.isRestful = true;
};
