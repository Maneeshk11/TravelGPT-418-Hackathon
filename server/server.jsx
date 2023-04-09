const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const app = express();
const mongoose = require('mongoose');
app.use(cors());
mongoose.connect("mongodb://localhost:27017/userDat")
.then(()=> {
  console.log("connected");
})
.catch(() => {
  console.log("failed");
})

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);



const newSchema = new mongoose.Schema({
  msg: {
    type:String,
    required: true

  }
})

const collection = mongoose.model("collection", newSchema);

module.exports = collection;

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// let amaan = "";
app.get("/", (req, res) => {
  res.send("success");
})
app.post("/", async(req, res) => {
  const {msg} = req.body
  const data={
    msg:msg
  }
  const chatGPTresp = await runCompletion(msg);
  res.send(chatGPTresp)  
})
let allText = "";
let arr = [];
async function runCompletion (msg) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg ,
    max_tokens: 1000,
  });
  allText = "";
  completion.data.choices.forEach((choice) => {
    allText += choice.text;
  });
  console.log(allText)
  const completionArr = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "return all places names in the text in a single line seperated by a comma without showing any extra text: " + allText,
    max_tokens: 1000,
  });
  arr = (completionArr.data.choices[0].text).split(",");
  // console.log(completionArr.data.choices[0].text);
  console.log(arr)
  return [allText, arr];
}

// app.get("/answerData", (req, res) => {
//   res.send(allText);
// })


app.listen(3003, ()=> {
  console.log("connected.")
});
