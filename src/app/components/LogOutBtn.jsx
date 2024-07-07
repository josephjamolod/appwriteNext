"use client";

import { useState } from "react";
import Loader from "./Loader";
import Axios from "axios";
import { useRouter } from "next/navigation";

export default function LogOutBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("/api/users/logout");
      console.log(response.data);
      setLoading(false);
      router.push("/login");
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleLogOut}
      className="capitalize border border-neutral px-3"
    >
      {loading ? <Loader size={"xs"} /> : "Log Out"}
    </button>
  );
}
