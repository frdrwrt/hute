import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });

console.log(`🚀 Server is running on http://localhost:${PORT}`);
