import express from "express"
import axios from "axios"
import ejs from "ejs"
import bodyParser from "body-parser"
import "dotenv/config"

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.post("/recipes", async (req, res) => {
    const recipe = req.body.recipe;
    console.log(recipe);
    const url = `https://api.edamam.com/api/recipes/v2?q=${recipe}&app_id=${process.env.RECIPE_APP_ID}&app_key=${process.env.RECIPE_APP_KEY}&type=public` 
    try {
        const response = await axios.get(url);
        res.render("index.ejs", {recipes: response.data});
    } catch (error) {
        res.send(error.response.data);
    }
});

app.post("/next", async (req, res) => {
    const url = req.body.url;
    console.log(url);
    try {
        const response = await axios.get(url);
        res.render("index.ejs", {recipes: response.data});
    } catch (error) {
        res.send(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}... `);
})