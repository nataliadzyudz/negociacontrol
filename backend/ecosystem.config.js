module.exports = {
  apps: [{
    name: 'nc-backend',
    script: 'src/index.js',
    cwd: '/var/www/nc-backend',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
    }
  }]
};
