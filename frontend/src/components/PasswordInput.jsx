import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";

export default function PasswordInput({ password,setPassword,placeholder,style }) {
    const [showPassword,setShowPassword]=useState(false)
    return(
       <div className={`${style} relative border-gray-200 rounded-lg border-solid border px-2 py-1`}>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={e=>{setPassword(e.target.value)}}
            placeholder={placeholder}
            className="p-2 outline-none text-xs w-full"
          />
          <HiEye
            className={`absolute right-2 text-gray-500 top-[50%] transform -translate-y-1/2 ${showPassword ? "hidden" : "block"}`}
            onClick={() => setShowPassword(true)}
          />
          <HiEyeOff
            className={`absolute right-2 text-gray-500 top-[50%] transform -translate-y-1/2 ${showPassword ? "block" : "hidden"}`}
            onClick={() => setShowPassword(false)}
          />
        </div>)}