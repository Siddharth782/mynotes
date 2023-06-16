import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const checkIn = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            return alert("passwords don't match")
        }
        let res = await fetch("http://localhost:8000/api/auth/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
        })
        res = await res.json()
        console.log(res)
        if (res.success) {
            localStorage.setItem('authToken', res.authToken)
            navigate('/')
        }
        else{
            alert(res.success)
        }
    }

    return (
        <div className='container'>
            <form onSubmit={checkIn}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={7} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={7} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
