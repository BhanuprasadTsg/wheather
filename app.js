const express=require("express");
const path=require("path");
const https = require("https");
const bodyParser= require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query=req.body.city;
  const apikey= "91373ad0f295ea3d3f9c3738a0c049d6";
  const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apikey+"&units=metric";
 https.get(url,function(response){
   console.log(response); 
    response.on("data",function(data){
       const wheather_data=JSON.parse(data);
       const temp=wheather_data.main.temp;
       const desc=wheather_data.weather[0].description;
       const icon=wheather_data.weather[0].icon;
       const imageurl="http://openweathermap.org/img/wn/" + icon +"@2x.png";
       res.write("<h1>Temperature in"+ query +" is=" + temp + "<sup>o</sup> Degree Celsius.</h1><br>");
       res.write("<h2>Descrition=" +desc+ ".</h2>");
       res.write("<img src=" + imageurl + ">");
       res.send();      
   })
 })
});



app.listen(8080,function(){
    console.log("server is running on port 8080");
});