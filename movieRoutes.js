const express = require("express");
const router = express.Router();
const movie = require("../../db/schemas/movieSchemas")
router.get("/",async (req, res) => {
      const queryParams = req.query;
      const filters = {};
      if (queryParams.name){
        filters.name = {
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
      }
      if (queryParams.rating) {
        filters.rating = {
            $gte: parseFloat(queryParams.rating),
        };
      }
    const movies = await movie.find(filters);
    res.json(movies);
});
router.post("/",async (req, res) => {
        try {
        console.log(req.body);
        const moviesData = req.body;
        const newMovie = new movie(moviesData);
        await newMovie.save();
        res.json({
            message:"movie added successfully",
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message:"internal server error",
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
       const movieId = req.params.id;
       const updateMovieData = req.body;
       await movie.findByIdAndUpdate(movieId,updateMovieData );
       res.json({
        message:"movie updated successfully",
    });
}catch(err) {
    console.log(err);
    res.status(500).json({
        message:"not updated",
    });
}
});
router.delete("/:id", async (req, res) => {
    try {
       const movieId = req.params.id;
       const deleteMovieData = req.body;
       await movie.findByIdAndDelete(movieId,deleteMovieData );
       res.json({
        message:"movie deleted successfully",
    });


}catch(err) {
    console.log(err);
    res.status(500).json({
        message:"not deleted",
    });
}
});
//task
router.get("/:id", async (req, res) => {
 try {
        const movieId = req.params.id;
        console.log("Handling the get by id request");
        const movie = await movie.findById(movieId);
        res.json(movie);
} catch (error) {
    if (error.kind === "ObjectId") {
            res.status(404).json({ message: "Movie not found"});
    } else {
            res.status(500).json({ message: "Internal server error"});
    }
 }
});
module.exports = router;
