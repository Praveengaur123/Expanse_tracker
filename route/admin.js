const path=require('path')
const express=require('express')
console.log("Entered in Database");

const adminController=require('../controller/admin')
const router=express.Router()

// Serving the html file
router.get('/',adminController.getExpansePage)

// insertin the entries
router.post('/add-entries',adminController.addEntries)

// deleting the entries
router.delete('/delete-entries/:id',adminController.deleteEntries)
// get the entriries
router.get('/get-entries',adminController.getEntries)

// updating
router.put('/edit-entires/:id',adminController.updateEntries)
module.exports=router;