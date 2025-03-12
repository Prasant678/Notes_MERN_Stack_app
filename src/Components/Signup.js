import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/Createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/login");
            props.showAlert("Sign up Successfully", "success");

        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className='container d-flex justify-content-center'>
                <div className='border border-dark rounded px-3' style={{ margin: "2rem", width: "33rem" }}>
                    <form className='my-4 mx-3' onSubmit={handleSubmit}>
                    <div className="mb-1">
                            <label htmlFor="name" className="form-label text-white" >Name</label>
                            <input type="text" className="form-control" placeholder='enter name' value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="email" className="form-label mt-1 text-white">Email</label>
                            <input type="email" className="form-control" placeholder='enter email address' value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label mt-1 text-white">Password</label>
                            <input type="password" className="form-control" placeholder='enter password' value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required/>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="cpassword" className="form-label mt-1 text-white">Confirm Password</label>
                            <input type="password" className="form-control" placeholder='enter confirm password' value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
                        </div>
                        <button type="submit" className="btn border-dark btn-primary mt-2 text-white">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
