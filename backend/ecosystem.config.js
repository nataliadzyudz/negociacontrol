module.exports = {
  apps: [{
    name: 'nc-backend',
    script: 'src/index.js',
    cwd: '/var/www/nc-backend',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      SUPABASE_URL: 'https://njzvqyovopcwfgwvnqli.supabase.co',
      SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qenZxeW92b3Bjd2Znd3ZucWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODY0MDUsImV4cCI6MjA5Mzc2MjQwNX0.VqVh82RH5klWs1vQLigm6ExDqZv9fefljO0_ydw2RiU'
    }
  }]
};