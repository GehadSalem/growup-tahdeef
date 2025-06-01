module.exports = {
  apps: [{
    name: "growup-api",
    script: "dist/index.js",  // Your compiled JS entry point
    instances: "max",         // Use all CPU cores
    autorestart: true,       // Auto-restart if crashes
    watch: false,            // Disable watching files
    max_memory_restart: "1G",// Restart if memory exceeds 1GB
    env: {
      NODE_ENV: "production",
      DB_HOST: "your_db_host",
      // Add other environment variables
    }
  }]
};