import React from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Header() {

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const handleLogout = async () => {
      try {
          await axios.get('/user/logout')
          localStorage.removeItem('firstLogin')
          window.location.href = "/";
      } catch (err) {
          window.location.href = "/";
      }
  }

    const userLink = () => {
      return <li className="drop-nav">
          <Link to="#" className="avatar">
          <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
          </Link>
          <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>

      </li>
  }

  const transForm = {
    transform: isLogged ? "translateY(10px)" : 0
    }


  return (
    <header>
    <div className="logo">
        <h1><Link to="/">Test Application</Link></h1>
    </div>

    <ul style={transForm}>
        {
            isLogged
            ? userLink()
            :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
        }
        
    </ul>
</header>
  )
}
