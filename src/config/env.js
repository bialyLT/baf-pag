(() => {
  if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config({ path: '.env.dev' });
  }
})();
