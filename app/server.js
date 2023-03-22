const express = require("express");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require('http-errors');
module.exports= class Application {
  #app = express();
  $PORT;
  DB_URI;
  constructor(PORT, DB_URI) {
    this.$PORT = PORT;
    this.$DB_URI = DB_URI;
    this.configApplication();
    this.connectMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(morgan("dev"))
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.$PORT, () => {
      console.log("app run in > http://localhost:" + this.$PORT);
    });
  }
  connectMongoDB() {
    const {default:mongoose} = require("mongoose");
   
    mongoose.connect(this.$DB_URI).then(()=>{
        console.log("connected to mongo"); 
    }).catch((error)=>{
        console.error(error.message); 
    });
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
  }
  createRoutes() {
    this.#app.use(AllRoutes)
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
     next(createError.NotFound("not found..."))
    });
    this.#app.use((error, req, res, next) => {
      const serverError=createError.InternalServerError();
      const status = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(status).json({
        error:{
          status,
          message
        }
      });
    });
  }
}
