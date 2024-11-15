// const express = require('express');
// const twilio = require('twilio');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());  // Parse incoming JSON requests
// app.use(cors());  // Enable CORS if frontend and backend are on different origins

// // Twilio credentials
// const accountSid = 'AC9';
// const authToken = '4d';
// const client = new twilio(accountSid, authToken);

// // Route to send OTP SMS
// app.post('/send-otp', (req, res) => {
//   const { phoneNumber } = req.body;  // Extract phone number from request

//   // Generate an OTP
//   const otp = Math.floor(100000 + Math.random() * 900000);  

//   // Send OTP SMS via Twilio
//   client.messages
//     .create({
//       body: `Your OTP code is: ${otp}`,
//       to: phoneNumber,  
//       from: '+18775353157'  
//     })
//     .then((message) => {
//       console.log('OTP sent:', message.sid);
//       res.status(200).json({ success: true, otp });  // Send OTP back to frontend (for validation)
//     })
//     .catch((err) => {
//       console.error('Error sending OTP:', err);
//       res.status(500).json({ success: false, error: err.message });
//     });
// });

// // Temporary storage for OTPs (in-memory; for demo purposes only)
// const otps = new Map(); // Maps phoneNumber -> otp

// app.post('/send-otp', (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   otps.set(phoneNumber, otp); // Store OTP in memory

//   client.messages
//     .create({
//       body: `Thank you for using TripleGaurd.Your OTP code is: ${otp}`,
//       to: phoneNumber,
//       from: '+18775353157'
//     })
//     .then((message) => {
//       console.log('OTP sent:', message.sid);
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.error('Error sending OTP:', err);
//       res.status(500).json({ success: false, error: err.message });
//     });
// });

// app.post('/verify-otp', (req, res) => {
//   const { phoneNumber, otp } = req.body;
//   const storedOtp = otps.get(phoneNumber);

//   if (storedOtp && storedOtp.toString() === otp) {
//     otps.delete(phoneNumber); // Clear OTP after successful verification
//     res.status(200).json({ success: true });
//   } else {
//     res.status(401).json({ success: false, message: 'OTP is incorrect' });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS if frontend and backend are on different origins

// Twilio credentials 
const accountSid = 'AC62b1c9b99758240d1e4db36737db5929'; 
const authToken = '4dee217c06d83714e76aec7204d5ecf4'; 
const client = new twilio(accountSid, authToken);

const otps = new Map(); // Maps phoneNumber -> otp

// Route to send OTP SMS
app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body; // Extract phone number from request

  // Generate an OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otps.set(phoneNumber, otp); 

  // Send OTP SMS 
  client.messages
    .create({
      body: `Thank you for using TripleGuard. Your OTP code is: ${otp}`,
      to: phoneNumber,
      from: '+18775353157' 
    })
    .then((message) => {
      console.log('OTP sent:', message.sid);
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error('Error sending OTP:', err);
      res.status(500).json({ success: false, error: err.message });
    });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body; 
  const storedOtp = otps.get(phoneNumber);

  if (storedOtp && storedOtp.toString() === otp) {
    otps.delete(phoneNumber); 
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'OTP is incorrect' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
