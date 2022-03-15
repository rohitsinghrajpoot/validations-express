const app = require("./index")

const connect= require("./configs/db")

app.listen("5500", async (req,res) =>{
    try{
        await connect()
        console.log("listening port 5500")
    } catch(err){
        console.log(err.message)
    }
})

