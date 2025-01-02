const path=require('path')

const Entries=require('../models/admin')

console.log("Entered in controller")
exports.addEntries=async(req,res)=>{
    console.log("add Entries")
    try{
        const amount=req.body.amount
        const description=req.body.description
        const category=req.body.category
        console.log("Here sending the data",req.body)
        if(req.body.description==undefined){
            throw new Error("id is mandatory")
        }
        console.log("created entries",req.body.id,amount,description,category);
        const data =await Entries.create({amount:amount,description:description,category:category})
        console.log("created entries",data);
        return res.status(201).json({newEntries:data})
    }
    catch(err){
        console.log("error in adding user",err.message);
        
    }
}
exports.getEntries=async(req,res)=>{
    console.log("getting the user")
    
    try{
        const entries=await Entries.findAll()
        res.status(200).json({allNewEntries:entries})
    }
    catch(err){
        console.log("get User is failed".JSON.stringify(err));
        res.status(500).json({err:err})
    }
}
exports.deleteEntries=async(req,res)=>{
    console.log("deleting the id no")
    const id=req.params.id
    console.log("deleting the id no",id)
    if(id==undefined){
        return res.status(400).json({err:"Id is missing"})
    }
    try{
        await Entries.destroy({where:{id}})
        res.sendStatus(200)
    }
    catch(err){
        res.sendStatus(500).json(err)
    }
}
exports.updateEntries=async(req,res)=>{
    console.log("Updating the data")
    const id=req.params.id
    const {amount,description,category}=req.body
    try{
        const entry=await Entries.findByPk(id)
        entry.amount=amount
        entry.description=description
        entry.category=category

        await entry.save()
        res.sendStatus(200).json({updatedEntry:entry})

    }
    catch(err){
        console.log("error updating entry",err)
        res.sendStatus(500).json(err)
    }

}

exports.getExpansePage=(req,res)=>{
res.sendFile(path.join(__dirname,'../views',"expanse.html"))
}