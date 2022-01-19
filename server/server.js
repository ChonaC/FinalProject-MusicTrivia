const express = require("express");
const path = require("path");
const db = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    //   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
