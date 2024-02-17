import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import useCustome from '../components/useCustome';
import { useNavigate } from 'react-router-dom';

export default function DeleteTask({state}) {
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
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {contract,account}=state;
        const {id}=value
        try {
            const res=await fetch(`https://bern2.onrender.com/api/ethereum/delete-task/${id}`,{
            method:"Post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({id})
        })

        const data = await res.json()

            if(data.status===200) {
              
                if(contract && contract.methods){
                  
                    await contract.methods
                    .deleteTask(id)
                    .send({from:account})
                    setModalContent(`Task has been Deleted`);
                }
            }else if(data.status===403){
                setModalContent(`${data.message}`);
            }
        } catch (error) {
            setModalContent(`There is problem to delete the task`);
        } finally {
            setModalOpen(true);
        }
    }

  return (
    <>
      <Navigation/>
      <div className="create_task todo_btn">
      <form onSubmit={handleSubmit}>
        <label>ID:
        <input text='type' name="id"  onChange={handleChange} />
        </label>
        <button type="submit">Delete Task</button>
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
