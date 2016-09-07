import HttpMethod from "./HttpMethod";
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
class Route {
  private _uri: string;
  private _method: HttpMethod;
  private _handler: Function;
  private _isRestful: boolean;

  get uri(): string {
    return this._uri;
  }

  set uri(value: string) {
    this._uri = value;
  }

  get method(): HttpMethod {
    return this._method;
  }

  set method(value: HttpMethod) {
    this._method = value;
  }

  get handler(): Function {
    return this._handler;
  }

  set handler(value: Function) {
    this._handler = value;
  }

  get isRestful(): boolean {
    return this._isRestful;
  }

  set isRestful(value: boolean) {
    this._isRestful = value;
  }
}

export default Route;
