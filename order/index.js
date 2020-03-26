////config.json//
const port = 8080;
const service = "order";
require("http")
  .createServer((req, res) => {
    let data = { msg: "invalid id or path", svc: service };
    if (req.url.search(`/${service}/1`) > -1)
      data = {
        orders: [
          {
            orderId: 1,
            orderAmount: 250,
            orderDate: "14-Apr-2020"
          },
          {
            orderId: 2,
            orderAmount: 450,
            orderDate: "15-Apr-2020"
          }
        ]
      };
    res.write(JSON.stringify(data));
    res.end();
  })
  .listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
