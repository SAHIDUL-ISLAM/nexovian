"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaUserMd, FaUserInjured, FaPills } from "react-icons/fa";
import { TbHomeStar } from "react-icons/tb";

const links = [
    { href: "/doctor", label: "Doctor", icon: <FaUserMd /> },
    { href: "/patient", label: "Patient", icon: <FaUserInjured /> },
    { href: "/pharma", label: "Pharma", icon: <FaPills /> },
];

const Navbar = () => {
    const pathname = usePathname();

    // closes the mobile dropdown after a click
    const closeMenu = () => document.activeElement?.blur();

    const linkClass = (href) =>
        `flex items-center gap-2 font-medium text-green-800 ${
            pathname.startsWith(href)
                ? "bg-green-800 text-white"
                : "text-slate-800 hover:bg-slate-300"
        }`;

    return (
        <div className="navbar bg-white shadow-sm px-4 sticky top-0 z-50">
            {/* Left */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        aria-label="Open menu"
                        className="btn btn-ghost lg:hidden px-2"
                    >
                        <FaBars className="text-xl" />
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-[#CBD5E1] rounded-box z-50 mt-3 w-56 p-2 shadow-lg"
                    >
                        {links.map((l) => (
                            <li key={l.href} onClick={closeMenu}>
                                <Link href={l.href} className={linkClass(l.href)}>
                                    {l.icon} {l.label}
                                </Link>
                            </li>
                        ))}
                        {/* Buttons inside the menu for very small screens */}
                        <li className="sm:hidden mt-2" onClick={closeMenu}>
                            <Link href="/signup" className="btn btn-sm bg-green-800 text-white border-none mb-1">
                                Sign Up
                            </Link>
                        </li>
                        <li className="sm:hidden" onClick={closeMenu}>
                            <Link href="/signin" className="btn btn-sm btn-outline bg-green-800 text-white">
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>

                <Link href="/" className="btn btn-ghost text-xl font-bold text-green-800"><TbHomeStar/>
                    Nexovian
                </Link>
            </div>

            {/* Middle */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1 px-1">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link href={l.href} className={linkClass(l.href)}>
                                {l.icon} {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end gap-2">
                <Link
                    href="/signup"
                    className="btn btn-sm sm:btn-md bg-green-800 text-white border-none hidden sm:inline-flex"
                >
                    Sign Up
                </Link>
                <Link
                    href="/signin"
                    className="btn btn-sm sm:btn-md bg-green-800 text-white border-none hidden sm:inline-flex"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default Navbar;