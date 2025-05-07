import { MetaFunction } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { useUser } from "~/api/client.auth";
import Header from "~/features/account/components/Header";

export const meta: MetaFunction = () => (
    [{ title: "Marketplace: Cuenta" }]
)

export default function Page() {
    const { user, isLoading } = useUser();

    return (
        <>
            <NavbarSmall />
            {!isLoading && (
                <main className={styles.profilePage}>
                    <Header 
                        pfp_url={user?.profile_picture_url} 
                        name={user?.first_name + " " + user?.last_name} 
                        edit    
                    />
                </main>
            )}
        </>
    )
}