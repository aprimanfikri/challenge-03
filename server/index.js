const http = require("http");
const app = require("../routes");

const server = http.createServer(app);

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
