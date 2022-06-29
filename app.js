const express = require("express");
const session = require("express-session");
const indexRouter = require("./routes/index");
const nunjucks = require("nunjucks");

const app = express();

app.set("port", process.env.PORT || 8000);
app.use(express.json());
app.set("view engine", "njk");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  if (req.url !== "/favicon.ico") {
    error.status = 404;
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
