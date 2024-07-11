"use client";

import { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.email === "" ||
      user.username === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      setIsError("All fields cannot be empty");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Password and confirm Password does not match");
      return;
    }
    if (user.password.length < 8) {
      setIsError("Password must atleast 8 character");
      return;
    }
    //  console.log(user);
    try {
      setIsError(false);
      setLoading(true);
      const response = await Axios.post("/api/users/signup", user);
      console.log(response.data);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      const { data, status } = error.response;
      if (status !== 500) {
        setIsError(data.message);
      } else {
        setIsError("there was an error, try again later");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col justify-center items-center  gap-y-2 mt-6 ${
        !isError && "mb-3"
      }`}
    >
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          name="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="text"
          className="grow"
          placeholder="Email"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          name="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          className="grow"
          placeholder="Username"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          name="password"
          type="password"
          className="grow"
          placeholder="Password"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          name="confirmPassword"
          type="password"
          className="grow"
          placeholder="Confirm Password"
        />
      </label>
      <button
        disabled={loading}
        className="btn btn-outline btn-secondary w-full disabled:opacity-75"
      >
        {loading ? "Signing in..." : "Sign Up"}
      </button>
      <p className="text-xs inset-0 text-red-500">{isError && isError}</p>
    </form>
  );
}
