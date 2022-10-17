import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userLogin } from '../Slices/userSlice'

const LoginPage = () => {
  
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [errors, setErrors] = useState()

  function handleUser(e){
    e.preventDefault()

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
      .then((r) => {
        if(r.ok) {
          r.json().then((data) => dispatch(userLogin(data)))
          navigate('/home')
        } else {
          r.json().then((r) => setErrors(r))
        }
      })
  }
  
  return (
    <div>
      <div className='border w-[30%] mx-auto mt-[5%]'>
        <div className='p-[3%]'>
          <div>
            Sign into your account:
          </div>
          <form onSubmit={handleUser} className='flex flex-col' >
            <label>Username:</label>
              <input name='username' className='border' value={username} onChange={(e) => setUsername(e.target.value)} autoFocus={true}></input>
            <label>Password:</label>
              <input className='border' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input type='submit' className='cursor-pointer border bg-slate-300 mt-3'/>
          </form>
          {errors? <div>{errors.errors}</div> : null }
        </div>
          <Link to='/signup' className='underline p-[10px]'>Create account?</Link>
      </div>
      <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
    </div>
  )
}

export default LoginPage