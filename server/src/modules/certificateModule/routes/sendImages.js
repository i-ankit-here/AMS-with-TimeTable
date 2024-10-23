const express = require("express");
const imageRouter = express.Router();
const path = require("path")

imageRouter.get("/*",(req,res)=>{
    try {
        let p = req.url;
        let i= 0;
        while(p[0]=='/' || p[0]=='\\')p = p.substring(1,p.length);
        // const image = path.join(__dirname,"../../../../",p)
        const image = p;
        console.log("Image path: ",p);
        const parts = image.split(".")
        if(parts[parts.length-1].toLocaleLowerCase()=="png" || parts[parts.length-1].toLocaleLowerCase()=="jpg" || parts[parts.length-1].toLocaleLowerCase()=="jpeg"){return res.sendFile(image)}
        else{
            res
            .status(400)
            .json({error:"invalid request"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = imageRouter
