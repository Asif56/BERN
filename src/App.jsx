import {useState} from "react";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import Wallet from './pages/Wallet'
import CreateTask from './pages/CreateTask'
import ViewAllTask from "./pages/ViewAllTask";
import ViewTask from "./pages/ViewTask";
import UpdateTask from "./pages/UpdateTask";
import DeleteTask from "./pages/DeleteTask";

function App() {

  const [state,setState]=useState({web3:null,contract:null,account:null})

  const saveState=({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }

  const router=createBrowserRouter([
    {path:'/',element:<Wallet saveState={saveState} />},
    {path:'/create-task',element:<CreateTask state={state} />},
    {path:'/view-all-tasks',element:<ViewAllTask state={state} />},
    {path:'/view-task',element:<ViewTask  state={state} />},
    {path:'/update-task',element:<UpdateTask state={state}/>},
    {path:'/delete-task',element:<DeleteTask state={state}/>}

  ])


  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}

export default App
