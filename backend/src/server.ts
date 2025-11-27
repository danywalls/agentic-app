import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { orderSupportFlow } from "./genkit";

const app = express();
const jsonParser = bodyParser.json()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("genkit with express");
});

app.post("/orderFlow", jsonParser, async (req, res) => {
    try {
        console.log(req.body);
        const response = await orderSupportFlow(req.body.data);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(error);
    }

});