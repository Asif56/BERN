const {contract} =require('../contract/contract')

const checkDate=async (taskDate)=>{
    console.log(taskDate)
    const instance= await contract.methods.allTaskCreate().call()
    const isExist= instance.find(date=>date.Date===taskDate)
    console.log('isExist',isExist)
    if(isExist){
        return isExist.name
    }
    return "Not Task Found"
}

const periortyCheck= async (taskId)=>{
    const instance=await contract.methods.allTaskCreate().call()
    return instance[taskId-1].name.includes('priority')
}

module.exports={checkDate,periortyCheck}