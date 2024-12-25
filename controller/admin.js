const path=require('path')


exports.getExpansePage=(req,res)=>{
res.sendFile(path.join(__dirname,'views','expanse.html'))
}