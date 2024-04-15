import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate,useLocation } from "react-router-dom";

function OTPVerification() {
    const location = useLocation();
    const [email, setEmail] = useState(location.state.email);
    const [otp, setOTP] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/verify-otp', { email, otp });
            alert(response.data.message);
            navigate('/login');  // Navigate after setting the localStorage
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred, please try again.');
        }
    };

    return (
        <div>
            <div className="content">
                <div className="flex-div">
                    <div className="name-content">
                        <h1 className="logo">OTP Verification</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="email" name="email" placeholder="Email or Phone Number" required value={location.state.email} onChange={(e) => setEmail(e.target.value)} disabled />
                        <input type="text" id="otp" name="otp" placeholder="OTP" required value={otp} onChange={(e) => setOTP(e.target.value)}  />
                        <button className="login" type="submit" >Verify OTP</button>
                        <hr />
                    </form>
                </div>
            </div>
            <div>{responseMessage}</div>
        </div>
    );
}

export default OTPVerification;
