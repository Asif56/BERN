import React, { useState } from 'react'
import Navigation from '../components/Navigation';
import useCustome from '../components/useCustome';
import { useNavigate } from 'react-router-dom';

const CreateTask = ({state}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  useCustome(state)
  const navigateTo= useNavigate()
  
  const closeModal=()=>{
    setModalOpen(false);
    setModalContent("");
    navigateTo("/view-all-tasks")
   }

  const createTask=async(event)=>{
    event.preventDefault();
    const {contract,account}=state;
    const taskName = document.querySelector("#taskName").value;
    const taskDate = document.querySelector("#taskDate").value;
    try {
      const res = await fetch("http://localhost:4000/api/ethereum/create-task",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({taskDate})
            })
            const data = await res.json()

            if(data.status===200){
              if(contract && contract.methods){
                  await contract.methods
                  .createtask(taskName,taskDate)
                  .send({from:account})
                  setModalContent(`Task ${taskName} added at ${taskDate}`);
              }
          }else{
              // alert("Task cannot be added")  
              setModalContent(`Task cannot be added due to existed same date in todo`);

          }

    } catch (error) {
      setModalContent(`Task is already exits at ${taskDate}`);
    } finally {
      setModalOpen(true);
    }

  }
  return (
    <>
    <Navigation/>
       <div className="create_task todo_btn">
            <form onSubmit={createTask}>
              <div style={{justifyContent:'flex-start'}}>
              <p style={{color:"orange",paddingBottom:"2px"}}>* You can priority the task by adding 'priority' keyword.</p>
              <p style={{color:"orange", display:''}}>* Created tasks won't have same date.</p>
              </div>
              <label>
                Name:
                <input id="taskName" type='text'/>
              </label>
              <label>
                Date:
                <input id="taskDate" type='date'/>
              </label>
              <button type="submit">Create Task</button>
            </form>

            {modalOpen && (
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

export default CreateTask
