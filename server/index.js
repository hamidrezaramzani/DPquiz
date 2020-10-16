const express = require('express');
const mongodb = require('mongodb');
const db = require('./db/db');
const config = require('config');
const morgan = require('morgan');
const quizRoutes = require('./routes/quiz');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(morgan("dev"));

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.use('/api/v1/quiz', quizRoutes);

app.listen(config.get("PORT"), () => {
    console.log(`Server running on port ${config.get("PORT")}`);
});