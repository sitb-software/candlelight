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
  pathVariable?: Object,
  remoteAddress?: String,
  remoteHost?: String,
  route?: Route
}

export default Context;
