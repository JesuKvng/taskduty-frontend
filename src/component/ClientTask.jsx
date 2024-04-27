import React, { useState } from 'react'
import '/src/pages/alltask/Tasks.css'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { dummyData } from '../data'
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios';

const ClientTask = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const userId = useParams()
    const token = localStorage.getItem("token")
    const fetchData =async()=>{
        const request = await fetch(`https://taskduty-server-dil8.onrender.com/api/v1/task/${userId}`,{
          headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
          }
        })
        const response = await request.json();
        console.log(response.task);
        setData(response.task)
      }

    //   delete FTN
    const handleDelete =async(userId)=>{
        try {
            const response = await axios.delete(`https://taskduty-server-dil8.onrender.com/api/v1/deletetask/${userId}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }


            })
            console.log(response);
            if(response.status === 200){
                toast.success(response.data.message)
            }

            setData(data.filter((existingDatum)=> existingDatum._id !==userId))
        } catch (error) {
            
        }
    }


      useEffect(()=>{
        fetchData()
      },[])
  return (
    <>
    <div className='container py-3' id="top">
      <div className='d-flex justify-content-between align-items-center py-4'>
        <div>
          <h1>My Task</h1>
        </div>
        <div>
          <Link to="/newtask"> + Add New Task </Link>
        </div>
      </div>

      {/* all tasks */}

    <div className='d-flex gap-3 flex-column'>
    {data && data.map((datum)=>(
        <div  key={datum.id}> 
        <div className='border rounded-2 mb-2  d-flex flex-column gap-5  justify-content-between'>
          <div className='d-flex justify-content-between align-items-center border-bottom  p-4 '>
            <h5>{datum.tags}</h5>
            <div className='d-flex gap-2 '>
                <Link to={`/edittask/${datum._id}`}>
            <button className='btn btn-primary'>edit</button>
                </Link>
            <button className='btn btn-primary'onClick={()=>handleDelete(datum._id)}> delete</button>
          </div>
          </div>
            <div className='text-box p-4'>
              <h2 className='text-start '>{datum.taskTitle}</h2>
              <p className='text-start '>{datum.description}</p>
            </div>
        </div>
        </div>
      ))}
    </div>
    <div className='d-flex justify-content-center py-4 '>
    <a href="#top" className='text-center text-decoration-underline '> Back To Top</a>
    </div>
    </div>
    
    </>
  )
}

export default ClientTask