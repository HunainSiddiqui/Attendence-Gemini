const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json());
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
connectDB();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Student = require('./model');
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: 'GET, POST,PUT,DELETE',
  credentials: true, // Include cookies in requests
}));
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
var finaldata ;
function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data:data,
      mimeType,
    },
  };
}

async function run(data) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt =
    "describe about the person in image";
  const imageParts = [fileToGenerativePart(data, "image/jpeg")];
  const result = await model.generateContent([prompt, ...imageParts]);
  console.log("Processing.....")
  const response = await result.response;
  const text = response.text();
  
  
  console.log(text);
 
}



// Route to fetch the Base64 text
app.post('/save', (req, res) => {
  // You can fetch the Base64 text from wherever it's stored
  const base64Text = req.body.imageData;
 
  run(base64Text);
  res.send({base64Text})
  


});

// Route to receive generated data and log it


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

