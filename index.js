const express=require("express")
const {connection}=require("./config/db")
const {  employRouter}=require("./routes/employRouter")
const { userRouter } = require("./routes/userRouter")
const app=express()

app.get("/",(req,res)=>{
     res.send(`All Routes of backned are writen bellow :
        
        Login backend API:"/login",
        Signup Backend API:"/signup",
        employee Dashboard APi:"/employees"
        
     `)  
})
app.use(express.json());
app.use("/",employRouter)
app.use("/",userRouter)



app.listen(3001,async()=>{
   try{
await connection
console.log("connected with Mongo Database")
    }catch(error){
console.log(error)
    }
    
}
)