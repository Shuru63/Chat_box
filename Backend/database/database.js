const mongoose=require("mongoose");
const Connectdb=()=>{
    mongoose.connect(process.env.DATABASE)
    .then(()=>{
        console.log("database is connected ");

    }).catch((error)=>{
        console.log("database is not connected ");
    })
};
 module.exports=Connectdb;
