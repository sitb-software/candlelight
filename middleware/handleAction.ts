import Context from '../modals/Context';
import ParameterType, { ParameterFrom } from "../modals/ParameterType";

function response({context, result}) {
  if (context.route.isRestful) {
    context.response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    context.response.end(typeof result === 'string' ? result : JSON.stringify(result));
  } else if (context.template === 'react') {
    const {type, props, children} = result;
    const React = require('react');
    const ReactDOMServer = require('react-dom/server');
    const html = ReactDOMServer.renderToString(React.createElement(type, props, children));
    context.response.end(html);
  }
}

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/7
 */
export default (ctx: Context) => {
  const {handler, parameterTypes} = ctx.route;
  const parameters = parameterTypes ? Object.keys(parameterTypes).sort().map(idx => {
    const {type, key} = parameterTypes[idx];
    switch (type) {
      case ParameterFrom.BODY:
        return ctx.body;
      case ParameterFrom.PATH:
        return (ctx.query || {})[key];
      default:
        return ctx.query[key] || (ctx.body || {})[key]
    }
  }) : [];
  parameters.push(ctx);
  const res = handler(...parameters);
  if (res instanceof Promise) {
    res.then(result => {
      response({
        context: ctx,
        result: result
      });
    }, error => {
      console.error(error);
    })
  } else {
    response({
      context: ctx,
      result: res
    });
  }
}
