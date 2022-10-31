import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userLogin } from '../Slices/userSlice'

const Signup = () => {
    
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()
    const [errors, setErrors] = useState()

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
          }),
        })
        .then((r) => {
            if (r.ok){
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
                  }
              })
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
              <form onSubmit={handleSubmit} className='flex flex-col' >
                  <label>Username:</label>
                  <   input name='username' className='border' value={username} onChange={(e) => setUsername(e.target.value)} autoFocus={true}></input>
                  <label>Password:</label>
                      <input className='border' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                  <label>Confirm Password:</label>
                      <input className='border' type='password' name='password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                <input type='submit' className='cursor-pointer border bg-slate-300 mt-3'/>
              </form>
              {errors? <div>{errors.error}</div> : null }
            </div>
            <Link to='/login' className='underline p-[10px]'>Already have an account?</Link>
          </div>
          
          <div className=' w-[25%] mx-auto my-5 text-center '><button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-full p-2'>Generate Palette</button></div>
        </div>
      )
}

export default Signup