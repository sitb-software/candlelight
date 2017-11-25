/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2017/11/25
 */
export class ArgumentNotValidException extends Error {

  key: string;

  constructor({key, message}) {
    super(message);
    this.key = key;
  }

}
