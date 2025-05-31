import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { resetPassword } from "../../service/userService";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const width = window.innerWidth < 980;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser, id, isLoading, setIsLoading } = useUserContext();
  const navigate = useNavigate();
  const [message,setMessage]=useState('')

  const resetPasswordFunction = async () => {
    if(password!==confirmPassword){
      toast.error('Password does not match')
    }
    else{
      setIsLoading(true);
      const res = await resetPassword(password, id);
      setUser(res);
      setIsLoading(false);
      if (res.status === "success") {
        localStorage.removeItem("verificationCode");
        navigate("/account/login");
        setMessage('')
        toast.success('Password changed successfully')
      }
      else{
        setMessage(res.message)
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        resetPasswordFunction()
        console.log("Form submitted");
      }}
      className="h-screen flex justify-evenly items-center z-20 max-[980px]:justify-center bg-white"
    >
      <img src={logo} className="w-60 max-[980px]:hidden" alt="logo" />
      <div className="flex flex-col justify-center items-center gap-3 bg-primary rounded-2xl py-10 max-[980px]:mr-0 
      w-[400px] max-[500px]:w-[90%] shadow-2xl shadow-gray-400 border border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl">Reset Password</h1>
          {width && <img src={logo} className="w-10" alt="logo" />}
        </div>
        <p className="text-xs">Enter your new password below.</p>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder="New password"
          style={`${message ? 'border-red-200' : 'border-gray-200'} w-[80%] max-[500px]:[90%]`}
        />
        <PasswordInput
          password={confirmPassword}
          setPassword={setConfirmPassword}
          placeholder="Confirm password"
          style={`${message ? 'border-red-200' : 'border-gray-200'} w-[80%] max-[500px]:[90%]`}
        />
        {!message && (
          <div className="flex flex-col text-xs text-gray-500 font-medium px-4 w-[80%]">
            <p>include at least 8 characters</p>
            <p>include at least uppercase letter</p>
            <p>include at least number</p>
            <p>include at least special character</p>
          </div>
        )}
        {message  && (
          <div className="flex flex-col w-[80%] px-4 font-medium">
            {message.map((item, index) => (
              <p key={index} className="text-red-500 text-xs">
                {item.msg}
              </p>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-black text-white px-4 py-3 w-[80%] rounded-[5px] flex items-center justify-center gap-2"
        >
          Reset Password {isLoading && <LoadingSpinner />}
        </button>
        <Link to="/account/login" className="text-red-500 text-[14px] font-medium">
          Back to Login
        </Link>
      </div>
    </form>
  );
}
