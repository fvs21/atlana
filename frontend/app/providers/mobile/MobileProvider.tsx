import React from "react";
import styles from "./styles.module.scss";
import { Link, useLocation } from "@remix-run/react";

type MobileProviderProps = {
    children: React.ReactNode;
}

export default function MobileProvider({ children }: MobileProviderProps) {
    const location = useLocation();

    return (
        <div className={styles.responsiveLayoutContainer}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );

}