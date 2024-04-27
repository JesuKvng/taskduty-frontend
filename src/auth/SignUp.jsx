import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import navlogo from '../assets/images/Group 2.png'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const SignUp = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [reveal,setReveal] = useState(false);
    const [isClicked,setIsClicked] = useState(false)
    const navigate = useNavigate()

    function handleHide (){
        !reveal ? setReveal(true) : setReveal(false)
    }

    const handleSignUp = async (e)=>{
      e.preventDefault()
      const signUpData = {
        email,
        password,
        name
      };
      setIsClicked(true)
      try {
        const request = await fetch("https://taskduty-server-dil8.onrender.com/api/v1/register",{
          method: "POST",
          headers: {
            "content-type":"application/json"
          },
          body:JSON.stringify(signUpData)
        })
        
        const response = await request.json();
        console.log(response);
        if(response.success === true){
          toast.success(response.message);
          setEmail("");
          setName("");
          setPassword("");
          setIsClicked(true)
          navigate("/SignIn")
          return
        }
        if(response.success === false){
          toast.error(response.message);
          return;
        }

        if(response.error.name === "ValidationError"){
          toast.error(response.error.message);
          return;
        }

      } catch (error) {
        console.log(error);
      }finally{
        setIsClicked(false)
      }
    };

  const btnText = isClicked ? "Loading..." : "Sign Up"

  return (
    <>
     <main className='container'>
      <div className='my-4'>
        <Link to='/'>
        <img src={navlogo} alt="nav-logo" />
        </Link>
      </div>
     <Form onSubmit={handleSignUp}>

     {/* name */}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your name with anyone else.
        </Form.Text>
      </Form.Group>

      {/* username */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      {/* password */}
      <Form.Group className="mb-3 position-relative"   controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={reveal ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <p onClick={handleHide} role='button' className='position-absolute end-0 top-50 pe-3 pt-1'>{reveal ? "hide" : "show"}</p>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit"disabled = {isClicked} >
        {btnText}
      </Button>
    </Form>
    </main>
    </>
  )
}

export default SignUp