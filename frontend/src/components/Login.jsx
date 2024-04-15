import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleApi = () =>{
        console.log({ email, password });
        const url = "http://127.0.0.1:3001/login";
        const data = { email, password };
        axios.post(url, data)
        .then((res)=>{
            console.log(res);
            if (res.data && res.data.message) {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');  // Navigate after setting the localStorage
                }
                alert(res.data.message);
            } else {
                alert("Unknown response from server");
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Server Error");
        });
    }

    return(
        <div>
            <div className="content">
                <div className="flex-div">
                    <div className="name-content">
                        <h1 className="logo">Login</h1>
                        <p>Connect, transact, and explore a world of possibilities – where buying and selling meet seamless connections.</p>
                    </div>
                    <form>
                        <input type="text" placeholder="Email or Phone Number" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="login" type="button" onClick={handleApi}>Log In</button>
                        <hr />
                        <button className="create-account" type="button" onClick={() => navigate('/signup')}>Create New Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
