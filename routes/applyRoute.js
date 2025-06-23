const express= require('express');
const router=express.Router();
//importing multer to upload the pdf
const multer=require('multer');
//importing the mongoose model of apply
const Apply=require('../models/apply');


/*
configuring the multer file 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/');
    },
    filename:(req,file,cb)=>{
        const suffix=Date.now();
        cb(null,suffix+'-'+file.originalname)
    }
})
 */

const storage=multer.memoryStorage();
const upload=multer({storage:storage})





router.post('/apply',upload.single('resume'),async(req,res)=>{
    try{

        const {name,course,skills,resume}=req.body;
        const photoBase64=req.file?req.file.buffer.toString('base64'):null;

        const NewApply=new Apply({name,
            course,
            skills,
            resume:photoBase64
        });
        await NewApply.save()
        res.status(201).json({newData:NewApply})
        console.log("data is saved successfully",NewApply);

    }
    catch(err){
        console.log("internal server error",err)
        res.status(500).json({error:err})

    }
})

module.exports=router;