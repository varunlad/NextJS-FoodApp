import Link from "next/link";
import logo from "@/assets/logo.png"
import classes from "./main-header.module.css"
import Image from "next/image";
import MainHeaderBackground from "./main-header-backgroung";
import { usePathname } from "next/navigation";
import NavLink from "./nav-link";

export default function Main_Header() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/"> <Image priority src={logo} alt="food" />Next Level Food</Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <p><NavLink TabName={'Browser Meals'} href={'/meals'} /></p>
                        </li>
                        <li>
                            <p><NavLink TabName={'Foodies Community'} href={'/community'} /></p>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}