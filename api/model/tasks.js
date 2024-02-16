const {contract} =require('../contract/contract')

const checkDate=async (taskDate)=>{
    const instance= await contract.methods.allTaskCreate().call()
    const isExist= instance.find(date=>date.Date===taskDate)
    if(isExist){
        return isExist.name
    }
    return "Not Task Found"
}

const periortyCheck= async (taskId)=>{
    const instance=await contract.methods.allTaskCreate().call()
    return instance[taskId-1].name.includes('priority')
}

const checkId=async(_id)=>{
    const instance= await contract.methods.allTaskCreate().call()
    const isExist= instance.find(date=>date.Id===_id)
}

module.exports={checkDate,periortyCheck,checkId}