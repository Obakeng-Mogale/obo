

const { response } = require("express");
const express = require("express");
const { appendFile } = require("fs");
const { STATUS_CODES } = require("http");
const https = require("https");
const request = require("request")
const app = express();

var mykey = config.MY_KEY

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.secondname;
    const email = req.body.email;
    const data ={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,

                }
            }
        ]

    };
    const jsonData = JSON.stringify(data)
    const options = {
        method: "POST",
        auth:mykey
    }
    const url = "https://us21.api.mailchimp.com/3.0/lists/369e88a15a"
    
    

    const request = https.request(url, options, function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data))
            if (response.statusCode === 200){
                res.sendFile(__dirname+"/success.html")
            }else{
                res.sendFile(__dirname+"/failure.html")
            }
        })
    })
    console.log(response.statusCode)
    // request.write(jsonData)
    request.end()
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("app is running on port 3000")
})


//api key
//7c8c8b76fea98e01055562292619fbeb-us21

//id
//369e88a15a