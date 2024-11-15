// pages/api/sendOtp.js
import sendOtp from 'C:/Users/fagra/OneDrive/Desktop/cybersecurity-auth/src/utils/sendOtp.js';  // assuming utils is the folder where sendOtp is defined

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
      // Call the sendOtp function
      const verificationSid = await sendOtp(phoneNumber);
      return res.status(200).json({ verificationSid });
    } catch (error) {
      return res.status(500).json({ error: 'Error sending OTP' });
    }
  } else {
    // If not POST request
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
