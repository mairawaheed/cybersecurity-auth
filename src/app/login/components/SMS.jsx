"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SMS({ onCorrectSMSOTPInput }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpSentTimestamp, setOtpSentTimestamp] = useState(null); // Track timestamp of OTP sent
  const router = useRouter();

  const handleSendOtp = async () => {
    if (phoneNumber) {
      try {
        // Make a POST request to the backend to send OTP
        const response = await fetch("http://localhost:5001/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setIsOtpSent(true);
          setOtpSentTimestamp(Date.now()); // Store the timestamp when OTP is sent
          console.log("OTP sent successfully");
        } else {
          alert("Error sending OTP");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending OTP");
      }
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  const handleResendOtp = async () => {
    if (phoneNumber) {
      // Allow OTP resend only if enough time has passed (e.g., 60 seconds)
      const currentTimestamp = Date.now();
      const timeDifference = currentTimestamp - otpSentTimestamp;

      if (timeDifference < 60000) {
        alert("Please wait before resending OTP.");
        return;
      }

      handleSendOtp(); // Call the original OTP send function to resend OTP
    }
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);

    if (e.target.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    if (otp.every((digit) => digit !== "")) {
      try {
        const response = await fetch("http://localhost:5001/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber, otp: otp.join("") }),
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
          console.log("OTP verified successfully");
          onCorrectSMSOTPInput();
        } else {
          alert("OTP is incorrect");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("An error occurred while verifying OTP");
      }
    } else {
      alert("Please enter all digits of the OTP.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          {isOtpSent ? "Enter OTP" : "Verify Phone Number"}
        </h2>
        <div className="space-y-4">
          {!isOtpSent ? (
            <div>
              <label className="block text-sm font-medium text-accent">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 w-full p-3 border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
                placeholder="Enter your phone number"
              />
              <button
                onClick={handleSendOtp}
                className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 focus:outline-none"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-accent">
                Enter OTP
              </label>
              <div className="flex space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength="1"
                    className="w-12 h-12 p-3 text-center border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
                    placeholder="-"
                  />
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={handleResendOtp}
                className="w-full mt-4 py-2 bg-secondary text-black rounded-md hover:bg-secondary/80 focus:outline-none"
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SMS;
