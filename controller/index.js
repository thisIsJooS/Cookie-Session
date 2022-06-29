const fs = require("fs");

exports.main = function (req, res, next) {
  res.setHeader("Domi", "Thiem");
  res.setHeader("Set-Cookie", "mycookie=test");
  res.cookie("hana", "card");
  res.clearCookie("hana");
  res.render("home");
};

exports.cookieTest = function (req, res, next) {
  const cookies = parseCookies(req.headers.cookie);

  if (!cookies.name) {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    res.setHeader("Location", "/");
    res.setHeader(
      "Set-Cookie",
      `name=${encodeURIComponent(
        "joos"
      )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    );
    return res.render("home");
  } else if (cookies.name) {
    // name이라는 쿠키가 있는 경우
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.json({ message: `${cookies.name}님 안녕하세요` });
  }
};

const parseCookies = (cookie = "") => {
  return cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

const session = {};

exports.sessionTest = function (req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  if (!cookies.session) {
    const name = "joos";

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires,
    };
    res.setHeader(
      "Set-cookie",
      `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    );
    return res.render("home");
  }
  // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
  else if (cookies.session && session[cookies.session]?.expires > new Date()) {
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    return res.json({
      message: `${session[cookies.session].name}님 안녕하세요.`,
    });
  } else {
    // 세션쿠키가 클라이언트에 저장이 되어있는데 서버를 재시작하여 서버상 session에 아무것도 들어있지 않을 때
    return res.render("home");
  }
};
