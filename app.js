require("dotenv").config();
const movieRoutes  = require("./routes/movies/moviesRoutes");
const index = require("./db/index");
const express = require("express");          //require is keyword usec to import modules,file
const app = new express();                 //app is an object
const port = process.env.PORT || 8080;  //port na used to contact that eg;house room 1(moni)
app.use(express.json());
app.use("/movies",movieRoutes);
index();
//process ethukuna process ku mattum set pandrathuku
app.listen(port, () => { // app.listen vandhu communicate with object as app.server start pandra command
    console.log(`express app listening at http://localhost:${port}`)//port nu irruka place la 8080 nu kuduthukalam

});
