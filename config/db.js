const mongoose = require('mongoose');
// DB config
const dbURI = require('./keys').mongoURI;
// connect to mongodb

const dbConnect = () => {
    mongoose.connect('mongodb://' + dbURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    )
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err))
    mongoose.Promise = global.Promise;
}
module.exports = {
    dbConnect
}
