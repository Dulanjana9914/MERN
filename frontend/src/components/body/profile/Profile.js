import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'


const initialState = {
    name: '',
    password: '',
    cf_password: '',
    about:'',
    err: '',
    success: ''
}

export default function Profile() {

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password,about, err, success} = data

    
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    


    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                about: about ? about : user.about,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
                
            })

            setData({...data, err: '' , success: "Updated Success!"})
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword =async (e) => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 8 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar|| about) updateInfor()
        if(password) updatePassword()
    }





  return (
      <div>
    <div>
    {err && showErrMsg(err)}
    {success && showSuccessMsg(success)}
    {loading && <h3>Loading.....</h3>}
    </div>
    <div className="profile_page">
    <div className="col-left">
        <h2>User Profile</h2>

        <div className="avatar">

        <img src={avatar ? avatar : user.avatar} alt=""/>
        <span>
             <i className="fas fa-camera"></i>
            <p>Change</p>
             <input type="file" name="file" id="file_up" onChange={changeAvatar}
              />
         </span>
        </div>

        <div className="col-md-13 mb-3 font">
         <label htmlFor="name">Name</label>
         <input type="text"
          className="form-control"
         name="name" id="name" defaultValue={user.name}
          placeholder="Your name" onChange={handleChange}
           />
    </div>

    <div className="col-md-13 mb-3 font">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                     className="form-control"
                    name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="col-md-13 mb-3 font">
                    <label htmlFor="about">About</label>
                    <input type="text"
                    className="form-control"
                    name="about" id="about"
                    placeholder="Details"defaultValue={user.about} onChange={handleChange} 
                    />
                </div>




                <div className="col-md-13 mb-3 font">
                    <label htmlFor="password">New Password</label>
                    <input type="password"
                     className="form-control"
                    name="password" id="password"
                    placeholder="Your password" value={password} onChange={handleChange} 
                    />
                </div>

                <div className="col-md-13 mb-3 font">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password"
                    className="form-control"
                    name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password} onChange={handleChange} 
                    />
                </div>


              <br/>
                <div>
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>
                <br/>
               <center> <button disabled={loading} onClick={handleUpdate}
                >Update</button> </center>

<br/>  <br/>
            </div>


    </div>
    </div>
    
  )
}
