import logo from "../../../public/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyEmail } from "../../service/userService";
import { useUserContext } from "../../context/userContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { resendCode } from "../../service/userService";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const width = window.innerWidth < 980;
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const { setUser, id, setToken, isLoading, setIsLoading } = useUserContext();
  const [sendMessage, setSendMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const verifyEmailFunction = async () => {
    if (verificationCode.length !== 5) {
      toast.error('Please enter a valid code')
    }
    else{
      setIsLoading(true);
      const res = await verifyEmail(verificationCode, id);
      setUser(res);
      setIsLoading(false);
    if (res.status == "success") {
      if (localStorage.getItem("type") === "activate") {
        localStorage.setItem("token", res.data.token);
        setToken(localStorage.getItem("token"));
        setSendMessage("");
        if (res.data.role === "user") {
          navigate("/");
        } else if (res.data.role === "admin") {
          navigate("/admin");
        }
      } else if (localStorage.getItem("type") === "reset") {
        localStorage.setItem("verificationCode", verificationCode);
        navigate("/account/resetpassword");
        setSendMessage("");
      }
    } else {
      setSendMessage(res.message);
    }
    }
  };


  const resendCodeFunction = async () => {
    const res = await resendCode(id);
    setUser(res);
    setIsLoading(false);
    setResendMessage(res.message);
  };
  return (
    <form
      className="h-screen flex justify-evenly items-center z-20 max-[980px]:justify-center bg-white"
      onSubmit={(e) => {
        e.preventDefault()
        verifyEmailFunction();
      }}
    >
      <img src={logo} className="w-60 max-[980px]:hidden" alt="logo" />
      <div className="flex flex-col justify-center items-center gap-3 bg-primary rounded-2xl py-10 max-[980px]:mr-0 w-[400px]
       max-[500px]:w-[95%] shadow-2xl shadow-gray-400 border border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl">Verify Email</h1>
          {width && <img src={logo} className="w-10" alt="logo" />}
        </div>
        <p className="text-xs">
          Please enter the verification code sent to your email.
        </p>
        <input
          type="number"
          placeholder="Verification Code"
          required
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className={`border-solid border px-4 py-3 text-xs outline-none rounded-[5px] w-[80%] text-center
            ${sendMessage ? 'border-red-200' : 'border-gray-200'}`}
          maxLength={5}
        />
        {sendMessage && <p className="text-red-500 text-xs font-medium -mt-2">{sendMessage}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white px-20 py-2 w-[80%] rounded-[5px] flex items-center justify-center gap-2"
        >
          Confirm {isLoading && <LoadingSpinner />}
        </button>
        <div className="text-xs  flex items-center gap-2">
          Didn’t receive the code?{" "}
          <p
            className="text-red-500 cursor-pointer font-medium"
            onClick={() => {
              resendCodeFunction();
            }}
          >
            Resend
          </p>
        </div>
        {resendMessage && <p className="text-green-500 text-xs font-medium -mt-2">{resendMessage}</p>}
        <Link to="/account/login" className="text-red-500 text-[14px] font-medium">
          Back to Login
        </Link>
      </div>
    </form>
  );
}
