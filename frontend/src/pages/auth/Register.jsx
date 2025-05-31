import { MdOutlineVerifiedUser } from "react-icons/md";
import logo from "../../../public/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { register } from "../../service/userService";
import { useUserContext } from "../../context/userContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Registre() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const width = window.innerWidth < 980;
  const navigate = useNavigate();

  const { user, setUser, setId, isLoading, setIsLoading } = useUserContext();
  const [message, setMessage] = useState("");

  const registerFunction = async () => {
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      setIsLoading(true);
      const res = await register({
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        gender: gender,
        email: email,
        password: password,
      });
      setUser(res);
      setIsLoading(false);

      if (res.status === "success") {
        localStorage.setItem("id", res.user._id);
        setId(localStorage.getItem("id"));
        navigate("/account/verifyemail");
        setMessage("");
        localStorage.setItem("type", "activate");
      } else {
        setMessage(res.message);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        registerFunction();
      }}
      className="min-h-screen py-10 flex justify-evenly items-center z-20 max-[980px]:justify-center bg-white"
    >
      <img src={logo} className="w-80 max-[980px]:hidden"></img>
      <div
        className="flex flex-col justify-center items-center gap-3 shadow-2xl shadow-gray-400 border border-gray-200 bg-primary
       rounded-2xl py-5 max-[500px]:w-[90%]"
      >
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl">Register</h1>
          {width && <img src={logo} className="w-10"></img>}
        </div>
        <p className="text-xs flex items-center gap-2">
          <MdOutlineVerifiedUser />
          Your information is protected
        </p>
        <div className="w-[80%] max-[500px]:w-[90%] flex justify-between items-start">
          <div className="w-[45%]">
            <input
              type="text"
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={` border-solid border px-4 py-3 text-xs outline-none rounded-[5px] w-full
               ${
                 message &&
                 typeof message === "object" &&
                 message.find((m) => m.path === "firstName")
                   ? "border-red-200"
                   : "border-gray-200"
               }`}
            />
            {message &&
              typeof message === "object" &&
              message.find((m) => m.path === "firstName") && (
                <p className="text-red-500 font-medium text-xs mt-1">
                  {message.find((m) => m.path === "firstName").msg}
                </p>
              )}
          </div>

          <div className="w-[45%]">
            <input
              type="text"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`border-solid border px-4 py-3 text-xs outline-none rounded-[5px] border-gray-200 w-full
              ${
                message &&
                typeof message === "object" &&
                message.find((m) => m.path === "firstName")
                  ? "border-red-200"
                  : "border-gray-200"
              }`}
            />
            {message &&
              typeof message === "object" &&
              message.find((m) => m.path === "lastName") && (
                <p className="text-red-500 font-medium text-xs mt-1">
                  {message.find((m) => m.path === "lastName").msg}
                </p>
              )}
          </div>
        </div>

        <input
          type="date"
          required
          placeholder="Date of Birth"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="w-[80%] max-[500px]:w-[90%] text-gray-500 border-solid border px-4 py-3 text-xs outline-none 
          rounded-[5px] border-gray-200"
        />

        <div className="flex flex-col w-[80%] max-[500px]:w-[90%]">
          <div className="w-full flex justify-between">
            <label
              className="flex items-center gap-2 w-[45%] text-gray-500 justify-between border-solid border 
            px-4 py-3 text-xs outline-none rounded-[5px] border-gray-200"
            >
              Male
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                required
              />
            </label>
            <label
              className="flex items-center justify-between text-gray-500 gap-2 w-[45%] border-solid border px-4 py-3
             text-xs outline-none rounded-[5px] border-gray-200"
            >
              Female
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                required
              />
            </label>
          </div>
        </div>
        <div className="w-[80%] max-[500px]:w-[90%]">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border-solid border px-4 py-3 outline-none rounded-[5px]
               text-xs w-full ${
                 message &&
                 (typeof message === "string" ||
                   (typeof message === "object" &&
                     message.find((m) => m.path === "email")))
                   ? "border-red-200"
                   : "border-gray-200"
               }`}
          />
          {message && typeof message === "string" && (
            <p className="text-xs font-medium px-4 text-red-500 mt-1">
              {message}
            </p>
          )}
          {message &&
            typeof message === "object" &&
            message.find((m) => m.path === "email") && (
              <p className="text-xs font-medium px-4 text-red-500 mt-1">
                {message.find((m) => m.path === "email").msg}
              </p>
            )}
        </div>

        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder="Password"
          style={`w-[80%] max-[500px]:w-[90%] ${
            message &&
            typeof message === "object" &&
            message.find((m) => m.path === "password")
              ? "border-red-200"
              : "border-gray-200"
          }`}
        />
        <PasswordInput
          password={confirmPassword}
          setPassword={setConfirmPassword}
          placeholder="Confirm Password"
          style={`w-[80%] max-[500px]:w-[90%] ${
            message &&
            typeof message === "object" &&
            message.find((m) => m.path === "password")
              ? "border-red-200"
              : "border-gray-200"
          }`}
        />
        {message &&
          typeof message === "object" &&
          message.find((m) => m.path === "password") && (
            <div className="text-red-500 font-medium text-xs -mt-2 text-start px-4 w-[80%] max-[500px]:w-[90%] flex flex-col gap-1">
              {message.filter((m) => m.path === "password").map((m) => <p>{m.msg}</p>)}
            </div>
          )}
        {!user && (
          <div className="flex flex-col text-xs text-gray-500 w-[80%] max-[500px]:w-[90%] px-4 font-medium">
            <p>include at least 8 characters</p>
            <p>include at least uppercase letter</p>
            <p>include at least number</p>
            <p>include at least special character</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black px-20 py-2 w-[80%] max-[500px]:w-[90%] rounded-[5px] text-white flex items-center gap-2 justify-center"
        >
          Sign up {isLoading && <LoadingSpinner />}
        </button>
        <hr />
        <Link
          to="/account/login"
          className="text-red-500 text-[14px] cursor-grab font-medium"
        >
          Already have an account?
        </Link>
        <p className="w-[400px] text-center text-[12px] px-10 max-[500px]:w-full font-medium">
          By continuing, you confirm that you're an adult and you've read and
          accepted our Agreement and Privacy Policy.
        </p>
      </div>
    </form>
  );
}
