const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/OnlineMarketplace").then(() => {
    console.log("Connected to MongoDB")
})

const Users = mongoose.model('user', {
    username: String,
    email: String,
    password: String,
    otp: String, // Adding OTP field
    otpExpires: Date, // Adding OTP expiration field
    createdAt: { type: Date, default: Date.now }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ishaanbharadwaj111@gmail.com', // Your email
        pass: 'czuxurukbmkufqkz' // Your email password
    }
});

// Function to send OTP via email
function sendOTP(email, otp) {
    const mailOptions = {
        from: 'ishaanbharadwaj111@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.post('/signup', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    let user = await Users.findOne({ username: username, email: req.body.email });
    if (!user) {
        try {
            const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
            const otpExpires = new Date(Date.now() + 600000); // OTP expires in 10 minutes
            user = new Users({ ...req.body, otp: otp, otpExpires: otpExpires });
            user.password = await bcrypt.hash(user.password, saltRounds);
            await user.save();
            // Send OTP via email
            sendOTP(user.email, otp);
            return res.send("OTP sent for verification");
        } catch (err) {
            res.status(400).send(err)
        }
    } else {
        res.send("Email or Username already in use.");
        console.log("Email or Username already in use")
    }
});

// Verify OTP route
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body)
    try {
        const user = await Users.findOne({ email: email, otp: otp, otpExpires: { $gt: Date.now() } });
        if (user) {
            // OTP is valid
            user.otp = null; // Clear OTP
            user.otpExpires = null; // Clear OTP expiration
            await user.save();
            return res.send("OTP verified successfully");
        } else {
            return res.status(400).send("Invalid OTP or OTP expired");
        }
    } catch (err) {
        console.error("Error verifying OTP:", err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    try {
        // Find user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(req.body)
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
        
        console.log("Login Successfully");
        res.send({ message: 'Found successfully.',token: token});
        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
