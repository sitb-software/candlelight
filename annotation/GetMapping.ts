import RequestMapping from './RequestMapping';
import HttpMethod from '../http/HttpMethod';

export default (path) => RequestMapping({
  path,
  method: HttpMethod.GET
});
