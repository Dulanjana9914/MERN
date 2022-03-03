import React from 'react';
import{ Route,Switch} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register';
import ActivationEmail from './auth/ActivationEmail'
import {useSelector} from 'react-redux'
import NotFound from '../utils/NotFound/NotFound'
import Profile from './profile/Profile';
import Home from './Home';

function Body() {

  const auth = useSelector(state => state.auth)
  const {isLogged} = auth
  return (
  
    <section>
        
        <Switch>

            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={ isLogged ? NotFound : Login}/>
            <Route path="/register" exact component={ isLogged ? NotFound : Register}/>
            <Route path="/user/activate/:activation_token" exact component={ActivationEmail}/>
            <Route path="/profile" exact component={ isLogged ? Profile :NotFound}/>
         </Switch>
    
    </section>
    

  )
}

export default Body

