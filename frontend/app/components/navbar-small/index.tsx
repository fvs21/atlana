import { Link, useNavigate } from "@remix-run/react";
import styles from "./NavbarSmall.module.scss";
import { useUser } from "~/api/client.auth";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import NavbarActions from "../navbar-actions";

export default function NavbarSmall() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>Tradenal.com</h1>
                    </Link>
                </div>
                <div className={styles.actions}>
                    <NavbarActions />
                    <button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Menu">
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>
    )
}