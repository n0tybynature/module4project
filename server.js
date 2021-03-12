const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;

const server = express();

server.use(cors());

const someData = [
    {
        id: 1,
        color: "Brindle"
    },
    {
        id: 2,
        color: "Black"
    },
    {
        id: 3,
        color: "Blue"
    },
    {
        id: 4,
        color: "Cream"
    },
    {
        id: 5,
        color: "White and Brindle"
    }
]

const sendError = (message , res ) => {

    res.status(422);
    res.json({ Error:message })
    return;
}

server.get("/data", (req,res) => {
    res.json(someData);
});

server.get("/data/:id", (req,res) => {
    const { id } = req.params;
    const findColorById = color => {
        return color.id === id;
    }
    const foundColor = someData.find(findColorById);

    if(!foundColor){
        return sendError("No color found", res);
    } else {
        res.json(foundColor)
    }
})

server.get("/", (req,res) => {
    res.send("Some Colors of Frenchies")
})


server.listen(port, err => {
    if(err) console.log(err);
    console.log(`server is listening on port ${port}`);
});