const port = 8080;
const service = "user";
require("http")
  .createServer((req, res) => {
    let data = { msg: "invalid id or path", svc: service };
    if (req.url.search(`/${service}/1`) > -1)
      data = {
        name: "Kunal Verma",
        age: "25",
        email: "Kunal.verma@nagarro.com"
      };
    res.write(JSON.stringify(data));
    res.end();
  })
  .listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
