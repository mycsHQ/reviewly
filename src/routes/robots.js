export default ctx => {
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = 'User-agent: *\nDisallow: /';
  return ctx;
}
