const express = require("express");
var bodyParser = require('body-parser')
const app = new express();
const cors = require('cors');
const bookRoute = require("../src/routes/bookRoute");

const port = process.env.port || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use(bookRoute);

app.listen(port, () => {
    console.log(`server listner port : ${port}`);
});