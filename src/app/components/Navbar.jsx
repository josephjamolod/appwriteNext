import Link from "next/link";
import LogOutBtn from "./LogOutBtn";

const navLinks = [
  { href: "/login", link: "log in" },
  { href: "/signup", link: "sign up" },
];

export default function Navbar() {
  return (
    <div className="bg-neutral-content flex justify-between items-center h-16 shadow-md px-20 ">
      <Link href={"/"}>Home</Link>
      <ul className="flex gap-x-2">
        {navLinks.map((link, index) => {
          return (
            <Link
              className="capitalize border border-neutral px-3"
              key={index}
              href={link.href}
            >
              {link.link}
            </Link>
          );
        })}
        <LogOutBtn />
      </ul>
    </div>
  );
}
