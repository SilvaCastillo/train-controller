module.exports = {
    development: {
      // Development CORS settings
      cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"],
      },
    },
    production: {
      // Production CORS settings
      cors: {
        origin: "https://www.student.bth.se",
        methods: ["GET", "POST"],
      },
    },
  };
