import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Succesfully", "success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
        <div className='container d-flex justify-content-center'>
            <div className='border border-dark rounded px-3' style={{margin: "7rem", width: "33rem"}}>
            <form className='my-4 mx-3' onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label htmlFor="email" className="form-label text-white" style={{color: "#62d9c9"}}>Email</label>
                    <input type="email" className="form-control" placeholder='enter email address' value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text-white" style={{color: "#62d9c9"}}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-1">
                    <label htmlFor="password" className="form-label mt-1 text-white"  style={{color: "#62d9c9"}}>Password</label>
                    <input type="password" className="form-control" placeholder='enter password' value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn border-dark btn-primary mt-2 text-white">LOG IN</button>
            </form>
            </div>
        </div>
        </div>
    )
}

export default Login