import { useState } from "react";
import logo from "../../../public/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { forgotPassword } from "../../service/userService";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ForgotPassword() {
  const width = window.innerWidth < 980;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { setUser, setId, isLoading, setIsLoading } = useUserContext();
  const [message, setMessage] = useState("");

  const forgotPasswordFunction = async () => {
    setIsLoading(true);
    const res = await forgotPassword({
      email: email,
    });
    setUser(res);
    setIsLoading(false);
    if (res.status == "success") {
      localStorage.setItem("id", res.data._id);
      setId(localStorage.getItem("id"));
      navigate("/account/verifyemail");
      setMessage("");
      localStorage.setItem("type", "reset");
    } else {
      setMessage(res.message);
    }
  };
  
  return (
    <form
      className="h-screen flex justify-evenly items-center z-20 max-[980px]:justify-center bg-white"
      onSubmit={(e) => {
        e.preventDefault()
        forgotPasswordFunction();
      }}
    >
      <img src={logo} className="w-60 max-[980px]:hidden" alt="logo" />
      <div className="flex flex-col justify-center items-center gap-3 bg-primary rounded-2xl py-10 max-[980px]:mr-0 w-[400px] 
      max-[500px]:w-[90%] shadow-2xl shadow-gray-400 border border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl">Forgot Password</h1>
          {width && <img src={logo} className="w-10" alt="logo" />}
        </div>
        <p className="text-xs">
          Enter your email to receive a verification code.
        </p>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border-solid border px-4 py-3 text-xs outline-none rounded-[5px] border-gray-200 w-[80%] max-[500px]:w-[90%]
            ${message ? 'border-red-200' : 'border-gray-200'}`}
        />
        {message && <p className="text-red-500 text-xs font-medium px-4 text-start w-[80%] max-[500px]:w-[90%] -mt-2">{message}</p>}
        <button
          type="submit"
          className="bg-black text-white px-20 py-2 w-[80%] max-[500px]:w-[90%] rounded-[5px] flex items-center gap-2 justify-center"
        >
          Send code {isLoading && <LoadingSpinner />}
        </button>
        <Link to="/account/login" className="text-red-500 text-[14px] font-medium">
          Back to Login
        </Link>
      </div>
    </form>
  );
}
