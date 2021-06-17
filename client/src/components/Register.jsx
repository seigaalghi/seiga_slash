import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      window.alert('Password does not match', 'danger');
    } else {
      try {
        const token = await axios.post("/api/users", formData)      
      if (token.status === 200){
        console.log(token.data.token)
        localStorage.setItem("token", token.data.token)
        const search = window.location.search
        const params = new URLSearchParams(search);
        const next = params.get('next');  
        window.location.href = next? next : "https://www.slash.co/"
      } else {
        window.alert(token?.data?.message? token.data.message : "Something went wrong")
      }
      } catch {
        window.alert("Something went wrong")
      }
    }
    
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input type='text' placeholder='Name' name='name' value={name} onChange={changeHandler} required />
          </div>
          <div className='form-group'>
            <input type='email' placeholder='Email Address' name='email' value={email} onChange={changeHandler} required />
            <small className='form-text'>This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
          </div>
          <div className='form-group'>
            <input type='password' placeholder='Password' name='password' minLength='6' onChange={changeHandler} value={password} />
          </div>
          <div className='form-group'>
            <input type='password' placeholder='Confirm Password' name='password2' minLength='6' onChange={changeHandler} value={password2} />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
