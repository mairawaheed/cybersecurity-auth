"use client";

import { useEffect, useState, useRef } from "react";
import mailLogo from "@/assets/mail.png";
import emailjs from "emailjs-com";

export default function VerifyEmail({
  userId,
  firstName,
  email,
  openModal,
  setOpenModal,
  onCorrectOTPInput,
}) {
  const [timer, setTimer] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const hasMounted = useRef(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otp, setOTP] = useState(Array(6).fill(""));
  const [user, setUser] = useState(null);

  async function fetchUser() {
    if (!userId) return;
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!hasMounted.current) {
      sendVerification();
      hasMounted.current = true;
    }
  }, []);

  function generateOTP() {
    const randomValues = new Uint8Array(6); // 6 bytes for 6 digits
    crypto.getRandomValues(randomValues);
    const otp = randomValues.map((value) => value % 10).join("");
    return otp;
  }

  const sendVerification = async () => {
    try {
      if (disabled) return;

      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setDisabled(false);
            return 0;
          }
        });
      }, 1000);

      setTimer(60);
      setDisabled(true);
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);

      setOTP(Array(6).fill(""));
      const templateParams = {
        to_name: firstName,
        otp: newOTP,
        to_email: email,
      };

      const response = await emailjs.send(
        "service_nt51aq1",
        "template_hroczq7",
        templateParams,
        "kU-JvUzRh3Vz0tkpB"
      );

      if (response.status === 200) {
        console.log("Verification email sent successfully!");
      } else {
        throw new Error(`Failed to send email: ${response.text}`);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleOTPChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus on the next input if value is entered
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }

      // Focus on the previous input if value is cleared and it's a backspace
      if (value === "" && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  async function handleOTPSubmit() {
    const enteredOTP = otp.join("");
    if (enteredOTP === generatedOTP) {
      user.isVerified = true;
      console.log("User:", user);
      await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      alert("OTP verified successfully!");
      setOpenModal(false);
      onCorrectOTPInput();
    } else {
      alert("Invalid OTP. Please try again.");
    }
  }

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Verify your Email Account</h2>
          <hr className="my-4" />
          <div className="space-y-6 flex flex-col items-center">
            <img className="w-1/3" src={mailLogo.src} alt="Mail Logo" />
            <p className="text-base leading-relaxed text-gray-500">
              Check your email for the verification link sent to <b>{email}</b>
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-2 my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(e.target.value, index)}
              className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          ))}
        </div>
        <button
          onClick={handleOTPSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
        >
          Verify OTP
        </button>
        <div className="flex items-baseline justify-center w-full mt-4">
          <p className="text-sm leading-relaxed text-gray-500">
            Still can't find the email?
          </p>
          &nbsp;
          <a
            onClick={sendVerification}
            className={`text-blue-500 text-sm ${
              !disabled && "cursor-pointer hover:text-blue-600 hover:underline"
            }`}
          >
            {disabled ? `Resend in ${timer} seconds` : "Resend"}
          </a>
        </div>
      </div>
    </div>
  );
}
