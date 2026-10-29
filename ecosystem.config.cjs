module.exports = {
  apps: [
    {
      name: 'eventora-backend',
      script: './server/index.js',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5023,
        CLIENT_URL: 'https://eventora.gemshine.tech',
        MONGODB_URI: 'mongodb://127.0.0.1:27017/eventora',
        DB_NAME: 'eventora',
        WHATSAPP_OWNER_NUMBER: '919876543210',
        JWT_SECRET: '7844808643f96f8757924b5e03fa6ceb7833279f2b4fd4528d1deaf9c39598ee',
        ADMIN_USERNAME: 'admin',
        ADMIN_PASSWORD: 'admin123',
        ADMIN_EMAIL: 'admin@eventora.com'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 5023
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true
    }
  ]
};
