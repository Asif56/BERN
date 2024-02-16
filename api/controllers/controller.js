const {contract} =require('../contract/contract') 
const {checkDate,periortyCheck}=require('../model/tasks')
const createTask=async (req,res)=>{
    const {taskDate} =req.body
    const data= await checkDate(taskDate)
    try {
        if(data!=="Not Task Found"){
            res.status(409).json({status:409,message:"Date clash: Task can not be added"})
        }else{
            res.status(200).json({status:200,message:"Task can be added"})
        }
    } catch (error) {
        console.error(error)
    }
}

const updateTask=async (req,res)=>{
    const {taskDate}=req.body; 
    const data= await checkDate(taskDate)
    try {
        if(data!=="Not Task Found"){
            res.status(409).json({status:409,message:"Date clash: Task can not be added"})
        }else{
            res.status(200).json({status:200,message:"Task can be added"})
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteTask=async (req,res)=>{
    const {taskId} =req.params
    
    const data=await periortyCheck(taskId)
    try {
        if(data){
            res.status(403).json({status:403,message:"Task can not be deleted due to task's name 'priority'."})
        }else{
            res.status(200).json({status:200,message:"Task can be deleted"})
        }
    } catch (error) {
        console.error(error)
    }
}

const viewTask=async (req,res)=>{
    try {
        const {taskId}=req.params
    
        const task=await contract.methods.viewTask(taskId).call()
        const {_id,name,Date}=task
        if(name=="" && Date==""){
            throw new Error;
        }
        const newId=Number(_id)
        const taskObj={
            newId,name,Date
        }
           res.status(200).json({status:200,taskObj,message:"Task Exists"})
        } catch (error) {
            res.status(500).json({status:500,message:"Task ID does not exists"})
        }

}
const AllTask=async (req,res)=>{
    try {
        const task=await contract.methods.allTaskCreate().call()
        if(task.length<0){
            res.status(404).json({status:404,message:"Task list does not exist"})
        }else {
            const taskList=task.map(({_id,name,Date})=>{
                const taskId= Number(_id)
                return {taskId,name,Date} 
            })
           res.status(200).json({status:200,taskList,message:"Task Exists"})
        }
    } catch (error) {
        res.status(500).json({status:500,message:"Task ID does not exists"})
    }
}

module.exports={createTask,updateTask,deleteTask,AllTask,viewTask}