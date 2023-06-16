import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    const navigate = useNavigate();

    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const checkIn = async (e) =>{
        e.preventDefault();
        let res = await fetch("http://localhost:8000/api/auth/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        })
        res = await res.json()
        console.log(res)
        if (res.success) {
            localStorage.setItem('authToken',res.authToken)
            navigate('/')
        }
    }

    return (
        <div className='container'>
            <form onSubmit={checkIn}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
