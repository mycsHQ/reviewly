module.exports = async ctx => {
  ctx.type = 'text/plain; charset=utf-8';
  ctx.body = 'User-agent: *\nDisallow: /';
  return ctx;
};
