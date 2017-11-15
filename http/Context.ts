import {
  IncomingMessage,
  ServerResponse
} from 'http';
import Route from './Route';

interface Context {
  request?: IncomingMessage,
  response?: ServerResponse,
  session?: Object,
  headers?: Object,
  cookies?: Object,
  query?: Object,
  originalBody?: String,
  body?: Object,
  pathVariable?: any,
  remoteAddress?: String,
  remoteHost?: String,
  route?: Route,
  template?: string
}

export default Context;
