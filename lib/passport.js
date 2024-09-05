const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("./db");

const option = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey:
    "!DV@eW81H;M7)Cb?#w2&vPk_-Y#y#Cg8MfdU*4&ZTqR-y#ge1{qU,F&b4GN2:PQW",
};

passport.use(
  new JwtStrategy(option, (payload, done) => {
    db("tb_user")
      .join("tb_users", "tb_user.emp_id", "=", "tb_users.id")
      .select(
        "tb_user.id",
        "tb_user.username",
        "tb_users.name",
        "tb_users.position",
        "tb_user.last_login"
      )
      .where({ "tb_user.id": payload.id })
      .first()
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, null);
      });
  })
);

module.exports = passport;
