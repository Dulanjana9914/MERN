import React, {useState} from 'react'
import { Link , useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import './body.css'
import {dispatchLogin} from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const initialState = {
  name:'',
  email: '',
  password: '',
  cf_password:'',
  err: '',
  success: ''
}

function Register() {

    const dispatch = useDispatch()
    const history = useHistory()

  const [user, setUser] = useState(initialState)

  const {name,email,password,cf_password,err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
}

const handleSubmit = async e => {
  e.preventDefault()
  
  if(isEmpty(name) || isEmpty(password))
  return setUser({...user, err: "Please fill in all fields.", success: ''})

  if(!isEmail(email))
  return setUser({...user, err: "Invalid email type.", success: ''})

  if(isLength(password))
  return setUser({...user, err: "Password must be at least 8 characters.", success: ''})

  if(!isMatch(password, cf_password))
  return setUser({...user, err: "Passwords did not match.", success: ''})


  try {
    const res = await axios.post('/user/register', {
      name, email, password
  })

  setUser({...user, err: '', success: res.data.msg})

  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}


const responseGoogle = async (response) => {

  console.log(response)
  try {
              
      const res = await axios.post('/user/google_signup', {tokenId: response.tokenId})
     
      setUser({...user, err:'', success: res.data.msg})
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push("/")
  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}

const responseFacebook = async (response) => {
  try {
      const {accessToken, userID} = response
      const res = await axios.post('/user/facebook_signup', {accessToken, userID})

      setUser({...user, err:'', success: res.data.msg})
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}

  return (
    <div>
 <div className="register">
  <form onSubmit={handleSubmit}>
  <h1 className="Hfont">Sign Up With Email</h1> 
  <br></br>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

  <div className="col-md-4 mb-3 font">
    <label htmlFor="name" className="form-label">
      Name
    </label>
    <input
      type="text"
      className="form-control"
      id="name"
      placeholder="Enter Name"
      value={name}
      name="name"
      onChange={handleChangeInput}
      required
    />
    </div>

    <div className='regpage'>

    <div className="col-md-4 mb-3 font">
    <label htmlFor="email" className="form-label">
      Email
    </label>
    <input
      type="email"
      className="form-control"
      id="email"
      placeholder="Enter Email"
      value={email}
      name="email"
      onChange={handleChangeInput}
      required
    />
    </div>
     
   
      <div className='googlesign'>
       <GoogleLogin
        clientId="389472249003-m71iinf8p0reaih8q9hdo6qdjs78gfhq.apps.googleusercontent.com"
        buttonText="Signup With Google"
        onSuccess={responseGoogle}
        cookiePolicy={'single_host_origin'}
       
       />
       
       </div>

        </div>
    
   <div className='regpage'>


    <div className="col-md-4 mb-3 font">
    <label htmlFor="password" className="form-label">
      Enter Password
    </label>
    <input
      type="password"
      className="form-control"
      id="password"
      placeholder="Enter Password"
      value={password}
      name="password"
      onChange={handleChangeInput}
      required
    />
    </div> 

    <div className='googlesign'> 
        <FacebookLogin
        appId="5086754768049630"
        autoLoad={false}
        fields="name,email,picture"
       
        callback={responseFacebook} />
      </div>  



    </div>
    
    
    
    
    
    



    <div className="col-md-4 mb-3 font">
    <label htmlFor="cf_password" className="form-label">
      Re-enter Password
    </label>
    <input
      type="password"
      className="form-control"
      id="cf_password"
      placeholder="Confirm Password "
      value={cf_password}
      name="cf_password"
      onChange={handleChangeInput}
      required
    />
    </div>

    &nbsp; 

    
    < button type="submit" class="btn btn-success btn-lg">
          
          Sign Up
         
        </button>

    <br></br>  

    </form>
    <hr className="col-md-12 mb-2" /> 

     

   <center><h3>Have an account?</h3></center> 

  <center> <Link to="/login">
       < button type="submit" class="btn btn-success btn-lg">
          
         Login Here
         
        </button></Link> </center>

       </div>
     </div>  

  )
}

export default Register