import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import navlogo from '../assets/images/Group 2.png'
import { Link, useNavigate }  from 'react-router-dom';
import toast from 'react-hot-toast';



const SignIn = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [reveal,setReveal] = useState(false);
  const [isClicked,setIsClicked] = useState(false)
  const navigate = useNavigate()
  

  function handleHide (){
    !reveal ? setReveal(true) : setReveal(false)
}
  const handleSignIn = async (e)=>{
    e.preventDefault()

    const logInData = {
      email,
      password
    }
    setIsClicked(true)
    try {
      const request = await fetch("https://taskduty-server-dil8.onrender.com/api/v1/login",{
        method: "POST",
        headers: {
          "Content-type":"application/json"
        },
        body:JSON.stringify(logInData)
      });
      const response = await request.json()
      console.log(response);
      if(response.token){
        localStorage.setItem("token",response.token)
        
      if(response.success === true){
        toast.success(response.message);
        setEmail("");
        setPassword("");
        setIsClicked(true)
        navigate("/alltask")
        location.reload()
        return;
      }
      if(response.success === false){
        toast.error(response.message);
        return
      }
      
      if(response.error.name === "ValidationError"){
        toast.error(response.error.message);
        return;
      }
        return;
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsClicked(false)

    }

  };

  const btnText = isClicked ? "Loading...." : "Sign In"

  return (
    <>
     <main className='container'>
      <div className='my-5'>
        <Link to='/'>
        <img src={navlogo} alt="nav-logo" />
        </Link>
      </div>

     <Form onSubmit = {handleSignIn}>
      {/* email address */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      {/*password  */}
      <Form.Group className="mb-3 position-relative"   controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={reveal ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <p onClick={handleHide} role='button' className='position-absolute end-0 top-50 pe-3 pt-1'>{reveal ? "hide" : "show"}</p>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isClicked}>
        {btnText}
      </Button>
    </Form>
    </main>
    </>
  )
}

export default SignIn