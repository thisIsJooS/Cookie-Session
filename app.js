const express = require("express");
const indexRouter = require("./routes/index");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.set("port", process.env.PORT || 8000);
app.use(express.json());
app.set("view engine", "njk");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(cookieParser("KUH"));

app.use(
  session({
    resave: false, // 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지
    secret: "KUH", // 쿠키 서명
    cookie: {
      httpOnly: true,
      secure: false, // false 이면 https가 아닌 환경에서도 사용할 수 있음
    },
    name: "session-cookie", //  세션 쿠키의 이름, default 값은 connect.sid
  })
);

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
