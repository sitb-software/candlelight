/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/6
 */
export default (req, res) => {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.end('404 Page Not Found.');
}
