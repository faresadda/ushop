import { MdOutlineVerifiedUser } from "react-icons/md";
import logo from "../../public/logo.png";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
export default function Login({ login, setLogin }) {
  const [registre, setRegistre] = useState(true);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const width = window.innerWidth < 980;
  return (
    <>
      {!login && (
        <div
          className="flex justify-evenly items-center bg-gray-100 w-[90%] h-[95vh] fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] 
    z-20 max-[980px]:justify-center max-[500px]:w-[95%]"
        >
          <IoMdClose
            className="absolute right-5 top-5 text-2xl max-[600px]:top-2 max-[600px]:right-2"
            onClick={() => {
              setLogin(!login);
            }}
          />
          <img src={logo} className="w-60 max-[980px]:hidden"></img>
          {registre && (
            <div className="flex flex-col justify-center items-center gap-3 bg-white rounded-2xl py-10! max-[980px]:mr-0! max-[500px]:w-[95%]">
              <div className="flex items-center justify-center gap-2">
                <h1>Login</h1>
                {width && <img src={logo} className="w-10"></img>}
              </div>
              <p className="text-xs flex items-center gap-2">
                <MdOutlineVerifiedUser />
                Your information is protected
              </p>
              <input
                type="email"
                placeholder="Email"
                className="border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400 w-[80%]"
              ></input>
              <input
                type="password"
                placeholder="Password"
                className="border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400 w-[80%]"
              ></input>
              <a href="#" className="text-red-500 text-[14px]">
                Forgot your password?
              </a>
              <button
                type="submit"
                className="bg-yellow-300 px-20! py-2! w-[80%]"
              >
                Login
              </button>
              <hr />
              <button
                className="bg-gray-200 py-2! w-[80%] cursor-grab"
                onClick={() => {
                  setRegistre(!registre);
                }}
              >
                Create a new account
              </button>
              <p className="w-[400px] text-center text-[12px] px-10! max-[500px]:w-full">
                By continuing, you confirm that you‘re an adult and you’ve read
                and accepted our Agreement and Privacy Policy.
              </p>
            </div>
          )}
          {!registre && (
            <div className="flex flex-col justify-center items-center gap-3 bg-white rounded-2xl py-5! max-[980px]:mr-0! max-[500px]:w-[95%]">
              <div className="flex items-center justify-center gap-2">
                <h1>Registre</h1>
                {width && <img src={logo} className="w-10"></img>}
              </div>
              <p className="text-xs flex items-center gap-2">
                <MdOutlineVerifiedUser />
                Your information is protected
              </p>
              <div className="w-[80%] flex justify-between">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-[45%] border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400"
                ></input>
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-[45%] border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400"
                ></input>
              </div>
              <label className="flex flex-col w-[80%]">
                Birthday
                <input
                  type="date"
                  required
                  className="w-full border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400"
                />
              </label>
              <label className="flex flex-col w-[80%]">
                Gender
                <div className="w-full flex justify-between">
                  <label className="flex items-center gap-2 w-[45%] border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400">
                    Male
                    <input
                      type="checkbox"
                      required
                      checked={male}
                      onChange={() => {
                        setMale(!male);
                        if (male == false && female == true) {
                          setFemale(!female);
                        }
                      }}
                    />
                  </label>
                  <label className="flex items-center gap-2 w-[45%] border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400">
                    Female
                    <input
                      type="checkbox"
                      required
                      checked={female}
                      onChange={() => {
                        setFemale(!female);
                        if (female == false && male == true) {
                          setMale(!male);
                        }
                      }}
                    />
                  </label>
                </div>
              </label>
              <input
                type="email"
                required
                placeholder="Email"
                className="border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400 w-[80%]"
              ></input>
              <input
                type="password"
                required
                placeholder="Password"
                className="border-solid border-2 p-2! outline-none rounded-[5px] border-gray-400 w-[80%]"
              ></input>
              <button
                type="submit"
                className="bg-yellow-300 px-20! py-2! w-[80%]"
              >
                Sign up
              </button>
              <hr />
              <a
                onClick={() => {
                  setRegistre(!registre);
                }}
                className="text-red-500 text-[14px] cursor-grab"
              >
                Already have an account?
              </a>
              <p className="w-[400px] text-center text-[12px] px-10! max-[500px]:w-full">
                By continuing, you confirm that you‘re an adult and you’ve read
                and accepted our Agreement and Privacy Policy.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
