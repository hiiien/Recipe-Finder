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
    res.render("index.ejs");
})

app.post("/recipes", async (req, res) => {
    const recipe = req.body.recipe;
    const url = `https://api.edamam.com/api/recipes/v2?q=${recipe}&app_id=${process.env.RECIPE_APP_ID}&app_key=${process.env.RECIPE_APP_KEY}&type=public` 
    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.send(error.response.data);
    }
});

app.post("/item-nutrition", async (req, res) => {
    const ingr = req.body.ingr;
    const url = `https://api.edamam.com/api/nutrition-data?ingr=${ingr}&app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}&nutrition-type=logging`
})



app.listen(port, () => {
    console.log(`listening on port ${port}... `);
})