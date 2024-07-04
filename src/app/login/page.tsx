import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LogInPage() {
  return (
    <div className="h-screen max-h-[700px] flex flex-col justify-start items-center   mt-20">
      <h1 className="text-5xl"> Sign In</h1>
      <LoginForm />
      <p>
        Don't have an account?{" "}
        <Link className="hover:underline text-blue-900" href={"/signup"}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
