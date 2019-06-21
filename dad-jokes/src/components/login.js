import React, { useState } from 'react'
import axios from 'axios'

const Login = props => {
    const [creds, setCreds] = useState({
        username: '',
        password: ''
      })

      const handleChange = e => {
        setCreds(prevCreds => ({
          ...prevCreds,
          [e.target.name]: e.target.value
        }))
      };
    
      const handleSubmit = e => {
        e.preventDefault()
    
        axios
          .post('http://localhost:3300/api/login', creds)
          .then(res => {
            localStorage.setItem('token', res.data.token)
            props.history.push('/jokes')
          })
          .catch(err => {
            console.log(err)
          })
      }
    
      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                onChange={handleChange}
                value={creds.username}
                name="username"
                id="username"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                value={creds.password}
                name="password"
                id="password"
                type="password"
              />
            </div>
            <div>
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
    )
}

export default Login