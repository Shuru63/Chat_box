const app=require("./app");
const dotenv=require("dotenv");
const path=require("path");
const Connectdb=require("../Backend/database/database")
const configPath = path.resolve(__dirname, 'Config/config.env');
dotenv.config({ path: configPath });
// process.on("unhandleREjection",(err)=>{
//     console.log(`error:${err.message}`);
//     console.log(`Shutting down the server becouse of hundle rejection`);
//     process.exit(1);
// })

// database connect
Connectdb();

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is runnimg : /http//:localhost:${process.env.PORT}`)
})

process.on("unhandle error",(err)=>{
    console.log(`error:${err.message}`);
    console.log(`Shutting down the server becouse of hundle rejection`);
    server.close(()=>{
        process.exit(1);
    })
})