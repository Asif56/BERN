import {useState,useEffect} from "react";
import Navigation from "../components/Navigation";
import useCustome from "../components/useCustome";

const ViewAllTask = ({state}) => {
    const [taskList,setTaskList]=useState([])
    useCustome(state)

    useEffect(()=>{
        const allTasks = async()=>{
            try{
                const res = await fetch("https://bern2.onrender.com/api/ethereum/view-all-tasks",{
                    method:"GET",
                    headers:{
                        "content-type":"application/json"
                    }
                })
                const data = await res.json();
                if(data.status===200){
                    setTaskList(data.taskList)
                }
            }catch(error){
                console.error(error)
            }
          }
          allTasks();
    },[])

  return (
    <>
      <Navigation/>
      <div className="view_all_tasks">
       <div style={{fontSize:'20px',color:'green'}}>All yours created ToDos.</div>
      {taskList.map((task)=>{
        return(
            <div 
            className="view_all_tasks_card"
            key={task.taskId}
            style={task.id!=="" && task.name!=="" && task.date!=="" ? {} : {display:"none"}}
            >   
                <p>{task.taskId}</p>
                <p>{task.name}</p>
                <p>{task.Date}</p>
            </div>
        )
      })}
      </div>
    </>
  )
}

export default ViewAllTask
