import SignupForm from "../components/SignupForm";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="h-screen max-h-[700px] flex flex-col justify-start items-center  mt-20">
      <h1 className="text-5xl"> Sign Up</h1>
      <SignupForm />
      <p>
        Already have an account?{" "}
        <Link className="hover:underline text-blue-600" href={"/login"}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
