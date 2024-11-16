const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// Twilio credentials
const accountSid = "AC62b1c9b99758240d1e4db36737db5929";
const authToken = "4dee217c06d83714e76aec7204d5ecf4";
const client = new twilio(accountSid, authToken);

const otps = new Map();

app.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body;
  console.log("The phone number in server is ", phoneNumber);

  const otp = Math.floor(100000 + Math.random() * 900000);
  const timestamp = Date.now();

  otps.set(phoneNumber, { otp, timestamp });

  client.messages
    .create({
      body: `Thank you for using TripleGuard. Your OTP is: ${otp}`,
      to: phoneNumber,
      from: "+18775353157",
    })
    .then((message) => {
      console.log("OTP sent:", message.sid);
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error("Error sending OTP:", err);
      res.status(500).json({ success: false, error: err.message });
    });
});

app.post("/verify-otp", (req, res) => {
  const currentTime = Date.now();
  const { phoneNumber, otp, timestamp } = req.body;
  const storedData = otps.get(phoneNumber);

  // Check if the stored data exists and contains the OTP and timestamp
  if (storedData) {
    const { otp: storedOtp, timestamp } = storedData;
    console.log("storedOtp:", storedOtp);

    // Verify the OTP and check if it's within 60 seconds of being sent
    if (storedOtp.toString() === otp && currentTime - timestamp < 60000) {
      otps.delete(phoneNumber); // Remove OTP after successful verification
      res.status(200).json({ success: true });
    } else if (currentTime - timestamp > 60000) {
      res.status(401).json({ success: false, message: "OTP has expired" });
    } else if (storedOtp.toString() !== otp) {
      res.status(401).json({ success: false, message: "OTP is incorrect" });
    } else {
      res.status(401).json({ success: false, message: "OTP not found" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
