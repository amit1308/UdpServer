const express = require("express");
const DbConnect = require("./database.js");
const DetailsModel = require("./models/details.js");
DbConnect();
const app = express();

  app.get("/getBc65Data", async (req, res) => {
     
       
       const data= await DetailsModel.find({});
       res.json(data);
    })

    app.listen(2121);