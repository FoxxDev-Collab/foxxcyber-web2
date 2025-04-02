module.exports = {
    apps: [
      {
        name: "foxxcyber",
        cwd: "/var/www/foxxcyber.web", // Ensure this is your correct project path
        script: "npm",
        args: "start",
        instances: 1, // Start with a single instance for troubleshooting
        exec_mode: "fork", // Use fork mode instead of cluster for initial testing
        env: {
          NODE_ENV: "production",
          PORT: 3000
        }
      }
    ]
  };