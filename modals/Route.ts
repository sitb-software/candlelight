import HttpMethod from "../http/HttpMethod";
import ParameterType from "./ParameterType";

interface Route {
  uri?: string
  method: HttpMethod
  handler?: Function
  isRestful: boolean
  parameterTypes: { [key: string]: ParameterType }
}

export default Route;
