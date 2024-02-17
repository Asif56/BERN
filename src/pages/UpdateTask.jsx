import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import useCustome from '../components/useCustome';
import { useNavigate } from 'react-router-dom';

export default function UpdateTask({state}) {
    const [value,setValue]= useState("")
    const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  useCustome(state)
  const navigateTo= useNavigate()

  const closeModal=()=>{
    setModalOpen(false);
    setModalContent("");
    navigateTo("/view-all-tasks")
}

    const handleChange=(e)=>{
        e.preventDefault()
        setValue({...value, [e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const {contract,account}=state;
        const {id,name,date}=value

        try {
            const res=await fetch("https://bern2.onrender.com/api/ethereum/update-task",{
            method:"Post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({taskDate:date})
        })

        const data = await res.json()

            if(data.status===200) {
                if(contract && contract.methods){
                    await contract.methods
                    .updateTask(id,name,date)
                    .send({from:account})
                    setModalContent(`Task ${name} at ${date} date has been updated`);
                }
            }    
        } catch (error) {
            setModalContent(`There is problem to update the task`);
        } finally{
          setModalOpen(true)
        }
    }
  return (
    <>
    <Navigation/>
      <div className="update_task todo_btn">
      <form onSubmit={handleSubmit}>
        <label>ID:
        <input type='text' name="id"  onChange={handleChange} />
        </label>
        
        <label>NAME:
        <input type='text' name="name"  onChange={handleChange} />
        </label>
        
        <label>DATE:
        <input type='date' name="date" onChange={handleChange} />
        </label>
       
        <button type="submit">Update Task</button>
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
