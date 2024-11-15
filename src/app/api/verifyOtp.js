// pages/api/verifyOtp.js
import verifyOtp from '../../utils/verifyOtp';  // assuming utils is the folder where verifyOtp is defined

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({ error: 'Phone number and code are required' });
    }

    try {
      // Call the verifyOtp function
      const isVerified = await verifyOtp(phoneNumber, code);

      if (isVerified) {
        return res.status(200).json({ message: 'OTP verified successfully' });
      } else {
        return res.status(400).json({ error: 'Incorrect OTP' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error verifying OTP' });
    }
  } else {
    // If not POST request
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
