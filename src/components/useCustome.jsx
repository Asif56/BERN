import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function useCustome(state) {
    const navigateTo= useNavigate()
    useEffect(()=>{
       if(state?.contract==null){
        navigateTo("/")
       }
    },[state])
    return 
}
