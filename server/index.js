const express = require('express');
const config = require('config');
const morgan = require('morgan');

const app = express();
app.use(morgan("dev"));

app.listen(config.get("PORT"), () => {
    console.log(`Server running on port ${config.get("PORT")}`);
});