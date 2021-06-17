import React, { Fragment, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();    
    try {
      const token = await axios.post("/api/auth", formData)      
    if (token.status === 200){
      console.log(token.data.token)
      localStorage.setItem("token", token.data.token)
      const search = window.location.search
      const params = new URLSearchParams(search);
      const next = params.get('next');

      window.location.href = next? next : "https://www.slash.co/"
    } else {
      window.alert("invalid email or password")
    }
    } catch {
      window.alert("invalid email or password")
    }
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign In to Your Account
        </p>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input type='email' placeholder='Email Address' name='email' value={email} onChange={changeHandler} required />
          </div>
          <div className='form-group'>
            <input type='password' placeholder='Password' name='password' minLength='6' onChange={changeHandler} value={password} />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
