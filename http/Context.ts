import {
  IncomingMessage,
  ServerResponse
} from 'http';
import Route from './Route';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
class Context {

  private _request: IncomingMessage;
  private _response: ServerResponse;
  private _route: Route;
  private _session = {};
  private _headers = {};
  private _cookies = [];
  private _query: Object = {};
  private _originalBody: string;
  private _body: Object = {};
  private _pathVariable: Object = {};
  private _remoteAddr: string;
  private _remoteHost: string;


  constructor(request, response) {
    this._request = request;
    this._response = response;
  }

  get request() {
    return this._request;
  }

  set request(value) {
    this._request = value;
  }

  get response() {
    return this._response;
  }

  set response(value) {
    this._response = value;
  }


  get route() {
    return this._route;
  }

  set route(value) {
    this._route = value;
  }

  get session() {
    return this._session;
  }

  set session(value) {
    this._session = value;
  }

  get headers() {
    return this._headers;
  }

  set headers(value) {
    this._headers = value;
  }

  get cookies() {
    return this._cookies;
  }

  set cookies(value) {
    this._cookies = value;
  }

  get query(): Object {
    return this._query;
  }

  set query(value: Object) {
    this._query = value;
  }

  get body(): Object {
    return this._body;
  }

  set body(value: Object) {
    this._body = value;
  }

  get pathVariable(): Object {
    return this._pathVariable;
  }

  set pathVariable(value: Object) {
    this._pathVariable = value;
  }

  get remoteAddr(): string {
    return this._remoteAddr;
  }

  set remoteAddr(value: string) {
    this._remoteAddr = value;
  }

  get remoteHost(): string {
    return this._remoteHost;
  }

  set remoteHost(value: string) {
    this._remoteHost = value;
  }

  get originalBody(): string {
    return this._originalBody;
  }

  set originalBody(value: string) {
    this._originalBody = value;
  }
}

export default Context;
