import React, { useState, useEffect } from "react";

export default function Fingerprint({ userId }) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [hasEnrolled, setHasEnrolled] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(false);
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

  const startFingerprintEnrollment = async () => {
    setIsEnrolling(true);
    setStatus("Initializing fingerprint enrollment...");
    setError("");

    const response = await fetch(`/api/fingerprint/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setStatus("Fingerprint enrolled successfully.");
      setIsEnrolling(false);
      setHasEnrolled(true);
      window.location.reload();
    } else {
      setIsEnrolling(false);
      setStatus("Fingerprint enrollment failed.");
      setError("An error occurred during fingerprint enrollment.");
    }
  };

  const handleResend = () => {
    setTimer(30);
    setDisabled(true);
    startFingerprintEnrollment();
  };

  React.useEffect(() => {
    if (timer > 0 && disabled) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setDisabled(false);
    }
  }, [timer, disabled]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Fingerprint Enrollment</h2>
          <hr className="my-4" />
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-1/3 h-1/3 bg-gray-300 rounded-full flex justify-center items-center">
              <span className="text-2xl text-gray-600">👆</span>
            </div>
            <p className="text-base leading-relaxed text-gray-500">
              {status || "Please place your finger on the sensor to enroll."}
            </p>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-center gap-2 my-4">
          <button
            onClick={startFingerprintEnrollment}
            className={`bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 ${
              isEnrolling || disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isEnrolling || disabled}
          >
            {isEnrolling
              ? "Scanning..."
              : hasEnrolled
              ? "Enrolled"
              : "Start Fingerprint Enrollment"}
          </button>
        </div>

        <div className="flex items-baseline justify-center w-full mt-4">
          <p className="text-sm leading-relaxed text-gray-500">
            {status === "Fingerprint enrollment failed." && "Try again?"}
          </p>
          &nbsp;
          {status === "Fingerprint enrollment failed." && (
            <a
              onClick={handleResend}
              className={`text-blue-500 text-sm ${
                !disabled &&
                "cursor-pointer hover:text-blue-600 hover:underline"
              }`}
            >
              {disabled ? `Retry in ${timer} seconds` : "Retry"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
