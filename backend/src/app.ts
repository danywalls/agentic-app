import express from "express";
import bodyParser from "body-parser";
import { orderSupportFlow } from "./genkit.js";

const app = express();
const jsonParser = bodyParser.json()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("genkit with express");
});

app.post("/orderFlow", jsonParser, async (req, res) => {
    try {
        const response = await orderSupportFlow(req.body.data);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(error);
    }

});