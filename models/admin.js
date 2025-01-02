const Sequelize=require('sequelize')

const sequelize=require('../util/database')
console.log("Entered in database")
const User=sequelize.define('expanse',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allownull:false,   
    },
    description:{
        type:Sequelize.STRING,
        allownull:false
    },
    category:{
        type:Sequelize.STRING,
        allownull:false
    }
})

module.exports=User