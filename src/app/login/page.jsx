"use client";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
const SignUpForm = React.lazy(() => import("./components/SignUpForm"));
import Logo from "@/assets/logo.png";

export default function Page() {
  const imageUrl = Logo.src;
  const [isSigningUp, setShowSignUp] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignUpSuccess = (email) => {
    setEmail(email);
    setShowEmailDialog(true);
  };

  return (
    <>
      <header>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </header>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-grow md:flex md:flex-row">
          <div className="hidden md:block h-full w-1/2 bg-accent">
            <Image
              width="500"
              height="500"
              src={imageUrl}
              alt="logo"
              className="object-contain w-full h-full"
            ></Image>
          </div>
          <div className="w-full md:w-1/2  overflow-auto bg-white">
            {isSigningUp ? (
              <SignUpForm className="" onSignUpSuccess={handleSignUpSuccess}>
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    className="font-semibold leading-6 text-primary hover:text-primary-hover"
                    onClick={(e) => setShowSignUp(false)}
                  >
                    Log in
                  </button>
                </p>
              </SignUpForm>
            ) : (
              <LoginForm className="z-50">
                <p className="text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <button
                    className="font-semibold leading-6 text-primary hover:text-primary-hover"
                    onClick={(e) => setShowSignUp(true)}
                  >
                    Register
                  </button>
                </p>
              </LoginForm>
            )}
          </div>
        </div>
        {showEmailDialog && (
          <VerifyEmail
            email={email}
            openModal={showEmailDialog}
            setOpenModal={setShowEmailDialog}
          ></VerifyEmail>
        )}
      </div>
    </>
  );
}
