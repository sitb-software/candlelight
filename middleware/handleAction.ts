import Context from '../http/Context';

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
  const res = ctx.route.handler(ctx);
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
