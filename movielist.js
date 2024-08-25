require("dotenv").config();
const express = require("express");
const movie =new express();
const movieRoutes = require("./routes/movies/moviesRoutes.js");
const port=process.env.PORT || 8080;

movie.use("/movies",movieRoutes);
movie.listen(port,()=>{
    console.log(`express app listening at https://localhost:${port}`);
});
