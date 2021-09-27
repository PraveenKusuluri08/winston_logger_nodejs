const logger = require("./logger/index");
const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Sample form</title></head");
    res.write("<body>");
    res.write("<h1>Praveen</h1>");
    res.write("<form action='/login'><button type='submit'>Login-page</button></form>")
    res.write("</body>");
    res.write("</html>");
    logger.info(`\n User Visited🏠 => localhost:${3000}${url} \n`);
    return res.end();
  }
  if (url === "/login") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Login</title></head>");
    res.write("<body>");
    res.write(
      "<form method='POST' action='/home'><input name='email' type='email'/><button type='submit'>Login</button></form>"
    );
    logger.info(`\n User acced to ${url}\n`)
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/home" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log("message",message);
      logger.info(`\n User mail Address ${message} \n`);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`App is listinig to the port ${PORT}`);
});
