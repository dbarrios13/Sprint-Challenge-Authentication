import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import Jokes from './components/jokes'
import './App.css';

function App(props) {
  const logout = () => {
    // e.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  return (
    <div className="App">
      <header>
        <nav>
          <NavLink to='/login'>Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/signup'>Sign Up</NavLink>
          &nbsp; | &nbsp;
          <button onClick={logout}>Log Out</button>
        </nav>
      </header>

      <main>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/jokes' component={Jokes}/>
      </main>
    </div>
  );
}

export default withRouter(App);
