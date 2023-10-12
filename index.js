const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
var cors = require('cors');
const authRoutes = require('./routes/auth')
const issueRoutes = require('./routes/issue')

env.config();
app.use(cors());

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.jy0uzsn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true
    }
).then(() => {
    console.log(`Database Connected`);
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/issue', issueRoutes);

app.listen(process.env.PORT_NUMBER, () => {
    console.log("Connected");
})


