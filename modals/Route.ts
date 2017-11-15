import HttpMethod from "../http/HttpMethod";

interface Route {
  uri?:string,
  method: HttpMethod,
  handler?: Function
  isRestful: boolean
}

export default Route;
