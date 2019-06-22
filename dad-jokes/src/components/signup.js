import React, { useState } from 'react'
import axios from 'axios'

const Signup = props => {
    const [creds, setCreds] = useState({
        username: '',
        password: ''
      })

      const handleChange = e => {
        e.persist()
        setCreds(prevCreds => ({
          ...prevCreds,
          [e.target.name]: e.target.value
        }))
      };
    
      const handleSubmit = e => {
        e.preventDefault()
    
        axios
          .post('http://localhost:3300/api/register', creds)
          .then(res => {
            props.history.push('/login')
          })
          .catch(err => {
            console.log(err)
          })
      }
    
      return (
        <div>
          <h1>Sign Up</h1>
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
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
    )
}

export default Signup