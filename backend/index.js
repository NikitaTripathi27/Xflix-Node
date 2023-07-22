const app =require('./app')
const mongoose = require("mongoose");
//const port = 8082;
// const url = "mongodb://127.0.0.1:27017/xflix";
//const url = "mongodb+srv://nikita2399020:8anrV73xWNMtaOy0@xflix.dzktoxy.mongodb.net/?retryWrites=true&w=majority"
const config = require('./config/config')
mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("connected successfully", config.mongoose.url);
  })
  .catch((error) => {
    console.log("login failed", error);
  });

app.listen(config.port, () => {
  console.log("connected on port", config.port);
});
