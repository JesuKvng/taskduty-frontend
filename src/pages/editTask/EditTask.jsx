import React from 'react'
import { useEffect, useState } from 'react'
import prev from '../../assets/images/prev.png'
import toast from 'react-hot-toast';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [tags,setTags] = useState("")
    const [isClicked,setIsClicked] = useState(false)
    const navigate = useNavigate()

    const {userId} = useParams()


    const taskDetails = {
        title,
        description,
        tags
      }
      const fetchData = async()=>{
        try {
          let request = await axios.get(`https://taskduty-server-dil8.onrender.com/api/v1/singletask/${userId}`,{
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
              },
          }
        ); 
        console.log(request.data.task);
        setTitle(request.data.task.title);
        setDescription(request.data.task.description);
        setTags(request.data.task.tags)
        } catch (error) {
            console.log(error);
            
        }
      };

      const handleUpdate = async(e)=>{
        e.preventDefault();
        setIsClicked(true)
        try {
           let data = await axios.patch(`https://taskduty-server-dil8.onrender.com/api/v1/updatetask/${userId}`,taskDetails,{
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
              },
          })
          if(data.data.success){
            toast.success(data.data.message)
            navigate("/alltask")
          }
          console.log(data); 
        } catch (error) {
            console.log(error);
            
        }finally{
            setIsClicked(false)
        }

      }
      const token = localStorage.getItem("token")

      const btnText = isClicked ? "Loading..." : "Done"

      useEffect(()=>{
        fetchData()
        if(!token){
            toast.error("unauthorized,please login")
            navigate("/")
          }
      },[userId])

  
  return (
    <>
    <main>
    <div id='top' className='container py-3'>
        <div className='py-3 d-flex align-items-center gap-4'>
       <span> <img src={prev} alt="" /></span>
        <h1>Edit Task</h1>
        </div>

        <div className='py-4'>
          <form className='d-flex flex-column gap-5 text-start'>
           <div>
           <label className='position-absolute translate-middle-y z-3 p-2 bg-white ms-3' htmlFor="">Task Title</label>
            <input className='w-100 rounded-1 border border-secondary px-4 py-3' type="text" placeholder='E.g Project Defense, Assignment ...'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           </div>

           <div className='d-flex flex-column'>
            <label className='position-absolute translate-middle-y p-2 z-3 bg-white ms-3' htmlFor="">Description</label>
            <textarea className='w-100 rounded-1 border border-secondary px-4 py-3' name="" id="" cols="30" rows="10" placeholder='Briefly describe your task...'value={description}
            onChange={(e)=>setDescription(e.target.value)} ></textarea>
           </div>

           {/* <div className='d-flex flex-column'>
            <label className='position-absolute translate-middle-y p-2 z-3 bg-white ms-3' 
            htmlFor="">Tags</label>
           <input className='w-100 rounded-1 border border-secondary px-4 py-3' type="text"/>
           </div> */}

           <div className='d-flex flex-column'>
            {/* <label className='position-absolute translate-middle-y p-2 z-3 bg-white ms-3' 
            htmlFor="">Tags</label>
           <input className='w-100 rounded-1 border border-secondary px-4 py-3' type="text"/> */}
          <label htmlFor="" className='position-absolute translate-middle-y p-2 z-3 bg-white ms-3'>Tags</label>
           <select name="" id="" className='w-100 rounded-1 border border-secondary px-4 py-3' 
           onChange={(e)=>setTags(e.target.value)}
           >
            {/* <option value="" className='text-secondary' default>select a tag</option> */}
            <option value="urgent">important</option>
            <option value="important">urgent</option>
           </select>
           </div>

           <button className='btn btn-primary' onClick={handleUpdate} disabled ={isClicked}
           >{btnText}
           </button>

           <a href="#top" className='text-center text-decoration-underline '> Back To Top</a>
  

          </form>
        </div>
    </div>
    </main>
    </>
  )
}

export default EditTask