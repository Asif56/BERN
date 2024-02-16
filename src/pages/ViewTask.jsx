import {useState} from "react";
import Navigation from "../components/Navigation";
import useCustome from "../components/useCustome";

const ViewTask = ({state}) => {
    const [task,setTask]=useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    useCustome(state)

    const closeModal = () => {
      setModalVisible(false);
      setModalContent("");
    };

    const viewTask =async(event)=>{
        try{
           event.preventDefault()
           const taskID = document.querySelector("#taskID").value;
           const res = await fetch(`http://localhost:4000/api/ethereum/view-task/${taskID}`,
           {
             method:"GET",
             headers:{
                 "content-type":"application/json"
             }
           });
           const data = await res.json();
           if(data.status===200){
             setTask(data.taskObj)
           }else{
             throw new Error;
           }
        }catch(error){
            // console.error('error',error)
         setModalContent("Task does not exist");
         setModalVisible(true);
        }
     }

  return (
    <>
    <Navigation/>
    <div className="view_task todo_btn">
      {task.numId!==null && task.name!==null && task.date!==null ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Task ID: {task.newId}</p>
            <p>Task Name: {task.name}</p>
            <p>Task Date: {task.Date}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <form onSubmit={viewTask}>
          <label>
            ID:
            <input id="taskID" />
          </label>
          <button type="submit">View Task</button>
        </form>
        {modalVisible && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <p>{modalContent}</p>
                </div>
              </div>
            )}
             </div>
      
    </>
  )
}

export default ViewTask
