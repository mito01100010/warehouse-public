import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useEffect } from 'react'

function Login() {
  const { login, currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate("/addProduct")
  }, [currentUser])

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
        
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>

      <form className='form'>
        <input required type="text" placeholder='Username' name='username' onChange={handleChange} />

        <input required type="password" placeholder='Password' name='password' onChange={handleChange} />

        <button onClick={handleSubmit}>Login</button>

        {err && <p>{err}</p>}

        <span>Don’t have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login