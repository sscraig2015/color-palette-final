import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, createSession, resetUserErrors } from '../Slices/userSlice'

const Signup = () => {
    
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()
    const errors = useSelector((state) => state.user.errors)

    function handleSubmit(e) {
        e.preventDefault();
        
        dispatch(createNewUser({username: username, password:password, passwordConfirmation: passwordConfirmation}))
        .then((r) => {
          if(r.meta.requestStatus === 'fulfilled'){
            dispatch(createSession({username: username, password: password}))
            navigate('/home')
          } else {
            setTimeout(() => {
              dispatch(resetUserErrors())
            }, 2500)
          }})
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
              {errors? <div>{errors}</div> : null }
            </div>
            <Link to='/login' className='underline p-[10px]'>Already have an account?</Link>
          </div>
          
          <div className=' w-[25%] mx-auto my-5 text-center '><button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-full p-2'>Generate Palette</button></div>
        </div>
      )
}

export default Signup