const express = require("express");
const { EmployModel } = require("../model/employModel");


const employRouter = express.Router();
employRouter.post("/employees",async(req,res)=>{
const userData=req.body
  try{
const data= new EmployModel(userData)
await data.save()
res.status(200).json({"msg":" data added succesffuly"})
  }catch(error){
res.status(400).json({"msg":'some dificulties on adding data'})
  }
})

employRouter.get("/employees",async(req,res)=>{

try{
  const { page = 1, limit = 5, sort, filter } = req.query;
const data = EmployModel.find(filter).sort(sort).skip((page - 1) * limit).limit(Number(limit));
const allData = await data.exec();
const total = await EmployModel.countDocuments(filter);
return res.json({
  allData,
  totalPages: Math.ceil(total / limit),
  currentPage: Number(page),
});
}catch(err){
res.status(400).json({"msg":"somthing wronge"})
}
})

employRouter.delete('/employees/:id', async (req, res) => {
  try {
    const { userID } = req.params;

    const target = await EmployModel.findByIdAndDelete(userID);

    return res.json({ message:"data removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

employRouter.patch("/employees/:id", async (req, res) => {
  const data = req.body;
  const id=req.params.id
  
  try {

   await EmployModel.findByIdAndUpdate({"_id":id},data)
    res.send(" data updated successfully");
  } catch (err) {
    console.log({ error: `${err}` });
  }
});



module.exports={
          employRouter
}



