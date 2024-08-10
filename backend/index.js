import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import OauthRoute from "./routes/oauth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;
const SESSION = process.env.SESS_SECRET;

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: SESSION,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", UserRoute);
app.use("/auth", AuthRoute);
app.use("/oauth", OauthRoute);

// store.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
