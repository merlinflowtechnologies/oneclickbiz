module.exports = {
  apps: [
    {
      name: 'oneclickbiz-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max', // Multi-core cluster mode
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
