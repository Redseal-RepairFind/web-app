import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type PasswordFieldProps = {
  title?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ title, ...props }, ref) => {
    const [showPassword, hidePassword] = useState(false);

    const toggleShowPassword = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      hidePassword(!showPassword);
    };

    return (
      <div className="w-full mb-1 flex-1">
        <label className="text-sm font-medium">{title || "Password"}</label>
        <div className="w-full relative mt-1">
          <span
            onClick={toggleShowPassword}
            className="absolute cursor-pointer top-[50%] right-2.5 translate-y-[-50%]"
          >
            <FontAwesomeIcon
              className="text-gray-700"
              icon={showPassword ? faEye : faEyeSlash}
            />
          </span>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
            className="w-full py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
