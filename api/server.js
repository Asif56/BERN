// 0x6a81ef6efb4d0d699e81c26144e5713e4b70b90e
const express= require('express')
const cors=require("cors")
const task=require('./routers/route')
const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/ethereum',task)

const Port=4000

app.listen(Port,()=>{
    console.log(`server is started at: ${Port}`)
})

// const web3= new Web3('https://eth-sepolia.g.alchemy.com/v2/-5hNbXp19DrbGO8I7U5MLXwKp3uLnz5J')
// const contractAddress="0x3877663f86De524EA1b63dC22d99ea2D1F5bdfEa"
// const contract=new web3.eth.Contract(ABI,contractAddress)



// app.post('/api/ethereum/create-task',async (req,res)=>{
//     // const {taskDate} =req.body
//     // const data= await checkDate(taskDate)
//     // try {
//     //     if(data!=="Not Task Found"){
//     //         res.status(409).json({status:409,message:"Date clash: Task can not be added"})
//     //     }else{
//     //         res.status(200).json({status:200,message:"Task can be added"})
//     //     }
//     // } catch (error) {
//     //     console.error(error)
//     // }


// })

// app.get('/api/ethereum/view-task/:taskId',async (req,res)=>{
//     try {
//     const {taskId}=req.params

//     const task=await contract.methods.viewTask(taskId).call()
//     const {_id,name,Date}=task
//     const newId=Number(_id)
//     const taskObj={
//         newId,name,Date
//     }
//        res.status(200).json({status:200,taskObj,message:"Task Exists"})
//     } catch (error) {
//         res.status(500).json({status:500,message:"Task ID does not exists"})
//     }
// })

// app.get('/api/ethereum/view-all-tasks',async (req,res)=>{
//     try {
//         const task=await contract.methods.allTaskCreate().call()
//         if(task.length<0){
//             res.status(404).json({status:404,message:"Task list does not exist"})
//         }else {
//             const taskList=task.map(({_id,name,Date})=>{
//                 const taskId= Number(_id)
//                 return {taskId,name,Date} 
//             })
//            res.status(200).json({status:200,taskList,message:"Task Exists"})
//         }
//     } catch (error) {
//         res.status(500).json({status:500,message:"Task ID does not exists"})
//     }
// })

// app.post('/api/ethereum/update-task',async (req,res)=>{
//     const {taskDate}=req.body; 
//     const data= await checkDate(taskDate)
//     try {
//         if(data!=="Not Task Found"){
//             res.status(409).json({status:409,message:"Date clash: Task can not be added"})
//         }else{
//             res.status(200).json({status:200,message:"Task can be added"})
//         }
//     } catch (error) {
//         console.error(error)
//     }
// })



// app.post('/api/ethereum/delete-task/:taskId',async (req,res)=>{
//     const {taskId} =req.params
    
//     const data=await periortyCheck(taskId)
//     try {
//         if(data){
//             res.status(403).json({status:403,message:"Task can not be deleted due to task'priority"})
//         }else{
//             res.status(200).json({status:200,message:"Task can be deleted"})
//         }
//     } catch (error) {
//         console.error(error)
//     }
// })
