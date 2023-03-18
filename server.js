const express = require('express')
const app = express()
const routes=require('./routes/user')
const mongoose=require('mongoose')
app.use(express.json())
app.use('/api',routes)
mongoose.connect('mongodb://0.0.0.0:27017/user' || process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
app.listen(5000,(req,res) => {
    console.log("server hitt")
})