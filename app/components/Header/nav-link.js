'use client'
import { usePathname } from "next/navigation";
import classes from "./main-header.module.css"
import Link from "next/link";
export default function NavLink({href,TabName}) {
        ////Path name Hook
        const path = usePathname(); 
        ////A hook for retrieving the current page's pathname in Next.js applications.
    return (
        <Link className={path.startsWith(href) ? classes.active : undefined}
            href={href}>
            {TabName}
        </Link>

    )
}