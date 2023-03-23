import dotenv from "dotenv"
dotenv.config()

import express, {
    Express,
    ErrorRequestHandler,
  } from "express";
import config from "config";
import validateEnv from './utils/validateEnv.utils';
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import indexRouter from "./router/index.router";



validateEnv();
const app: Express = express();

// set View engine
app.use(expressEjsLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("layout extractScripts", true)

app.use(express.static(path.join(__dirname, "public")));

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));










// GLOBAL VARIABLES
app.locals.title="Daily Planner"


// ROUTES ⼬
app.use("/", indexRouter());


  //   error andling
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") == "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    req.app.get("env") == "development"
      ? res.render("error", { layout: false })
      : res.render("404", { layout: false });
    next();
  };
  app.use(errorHandler);
  



  async function bootstrap() {
 // MONGOOSE

    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/planr")
    const database = mongoose.connection
    database.on('error', (error) => {
      console.log(error)
    })

    database.once('connected', () => {
      console.log('Database Connection established');
    })

    const port = config.get<number>('port');
    app.listen(port, () => {
      console.log(`Server on port: ${port}`);
    });
  }

  bootstrap()
  .catch((err) => {
    throw err;
  })