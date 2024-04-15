import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import OTPVerification from "./OTPVerification";

function Signup(){
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [username,setusername] = useState('');
    const navigate = useNavigate();
    const handleApi = () =>{
        console.log({username,email,password});
        const url = "http://127.0.0.1:3001/signup";
        const data = {username,email,password};
        axios.post(url,data)
        .then((res)=>{
            console.log(res)
            alert('Account is Created. Please Verify  Your Email');
            navigate('/OTPVerification',{state:{email}});
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>

            <div className="content">
                <div className="flex-div">
                    <div className="name-content">
                        <h1 className="logo">Signup</h1>
                        <p>Connect, transact, and explore a world of possibilities – where buying and selling meet seamless connections.</p>
                    </div>
                    <form>
                    <input type="text" placeholder="UserName" required value={username} onChange={(e) => setusername(e.target.value)} />
                        <input type="text" placeholder="Email or Phone Number" required value={email} onChange={(e) => setemail(e.target.value)} />
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)} />
                        <button className="login" type="button" onClick={handleApi}>Submit</button>
                        <hr />
                        <button className="create-account" type="button" onClick={() => navigate('/login')}>Login</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}
export default Signup;