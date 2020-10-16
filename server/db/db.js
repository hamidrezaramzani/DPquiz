const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/dpquiz", {
    useCreateIndex: true,
    useNewUrlParser: true
});
module.exports = mongoose;