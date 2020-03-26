const port = 8080;
const service = "orderdetail";
const usersvc = process.env.usersvc || "localhost:1111";
const ordersvc = process.env.ordersvc || "localhost:2222";
const version = process.env.version;
const http = require("http");
const get = url =>
  new Promise(x =>
    http
      .get(url, res => res.setEncoding("utf8").on("data", body => x(body)))
      .on("error", e => x(JSON.stringify(e)))
  );
http
  .createServer((req, res) => {
    let data = { msg: "invalid id or path", svc: service, version: version };
    if (req.url.search(`/${service}/1`) > -1) {
      let id = Number(req.url.split("/").reverse()[0]);
      Promise.all([
        get(`http://${usersvc}/user/${id}`),
        get(`http://${ordersvc}/order/${id}`)
      ]).then(v => {
        v = v.map(x => JSON.parse(x));
        res.write(JSON.stringify({ userDetails: v[0], ...v[1] }));
        res.end();
      });
    } else {
      res.write(JSON.stringify(data));
      res.end();
    }
  })
  .listen(port, () => console.log(`http://localhost:${port}/`));
