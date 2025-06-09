import { MdOutlineVerifiedUser } from "react-icons/md";
import logo from "../../../public/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/userService";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Login() {
  const width = window.innerWidth < 980;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setId, setToken, isLoading, setIsLoading } =
    useUserContext();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginFunction = async () => {
    const res = await login({
      email: email,
      password: password,
    });
    setUser(res);
    setIsLoading(false);
    if (res.status === "success") {
      setMessage("");
      localStorage.setItem("id", res.data._id);
      setId(localStorage.getItem("id"));
      if (res.data.isVerified === true) {
        localStorage.setItem("token", res.data.token);
        setToken(localStorage.getItem("token"));
        toast.success('Account logged in')
        if (res.data.role === "user") {
          navigate("/");
        } else if (res.data.role === "admin") {
          navigate("/admin");
        }
      } else {
        navigate("/account/verifyemail");
        localStorage.setItem("type", "activate");
      }
    } else {
      setMessage(res.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    loginFunction();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        console.log("Form submitted");
      }}
      className="h-screen flex justify-evenly items-center z-20 max-[980px]:justify-center bg-white"
    >
      <img src={logo} className="w-80 max-[980px]:hidden"></img>
      <div className="flex flex-col justify-center items-center gap-3 bg-primary rounded-2xl py-10 max-[980px]:mr-0 w-[400px]
       max-[500px]:w-[90%] shadow-2xl shadow-gray-400 border border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl">Login</h1>
          {width && <img src={logo} className="w-10"></img>}
        </div>
        <p className="text-xs flex items-center gap-2">
          <MdOutlineVerifiedUser />
          Your information is protected
        </p>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border-solid text-xs px-4 py-3 outline-none rounded-[5px] border border-gray-200 w-[80%] max-[500px]:w-[90%]
             ${message ? 'border-red-200' : 'border-gray-200'}`}
        ></input>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder="Password"
          style={`w-[80%] max-[500px]:w-[90%] ${message ? 'border-red-200' : 'border-gray-200'}`}
        />
        {message && <p className="text-red-500 text-xs font-medium px-4 text-start w-[80%] max-[500px]:w-[90%]">{message}</p>}
        <button
          type="submit"
          className="bg-black text-white py-2 w-[80%] max-[500px]:w-[90%] rounded-[5px] flex items-center gap-2 justify-center"
        >
          Login {isLoading && <LoadingSpinner />}
        </button>
        <Link to="/account/forgotpassword" className="text-red-500 text-[14px] font-medium">
          Forgot your password?
        </Link>
        <hr />
        <Link
          to="/account/register"
          className="border border-gray-200 py-2 w-[80%] max-[500px]:w-[90%] cursor-grab text-center rounded-[5px] font-medium"
        >
          Create a new account
        </Link>
      </div>
    </form>
  );
}
