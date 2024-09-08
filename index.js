require("dotenv").config();

//from files
const { connect } = require("./connection");
connect(process.env.MONGO_URI);
const { rt1 } = require("./routes/LOG_ROUTES");

//from dependencies
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const cookieParser = require("cookie-parser");
const path = require("path");
const fileupload = require("express-fileupload");
const app = express();

//configuration-----------
const websites = ["http://localhost:3000"];
app.use(fileupload({ useTempFiles: false }));
app.use(express.static(path.resolve("./public")));

app.use(
  cors({
    origin: websites,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes------------

app.get("/auth/google", (req, res, next) => {
  (reqtype = req.query.signup),
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next);
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await USER.findOne({ email: profile.emails[0].value });

        if (!user && reqtype === "noo") {
          user = "no user";
        } else if (!user && reqtype === "yess") {
          user = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profileimg: profile.photos[0].value,
            saved: false,
          };
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    if (req.user !== "no user") {
      if (req.user !== "no user" && reqtype === "noo") {
        const token = create_token_for_user(req.user);
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          sameSite: "None",
        });

        res.redirect("http://localhost:8000/user/dashboard");
      } else if (reqtype === "yess" && req.user.saved == false) {
        const new_user = await USER.create({
          name: req.user.name,
          email: req.user.email,
          profileimg: req.user.profileimg,
          googleId: req.user.googleId,
          password: "null",
        });

        const token = create_token_for_user(new_user);

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          sameSite: "None",
        });

        res.redirect("http://localhost:8000/set-data");
      } else if (req.user !== "no user" && reqtype === "yess") {
        const token = create_token_for_user(req.user);

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          sameSite: "None",
        });

        res.redirect("http://localhost:8000/user/dashboard");
      }
    } else {
      res.redirect("http://localhost:8000/signup");
    }
  }
);

app.use("/log", rt1);
app.use("/user", rt2);
app.use("/rag", rt3);
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED!! CPU--->${process.pid}`);
});
