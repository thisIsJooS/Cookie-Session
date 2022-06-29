const fs = require("fs");

exports.main = function (req, res, next) {
  res.setHeader("Domi", "Thiem");
  res.setHeader("Set-Cookie", "mycookie=test");
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
