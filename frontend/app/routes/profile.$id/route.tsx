import { MetaFunction, useLoaderData } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import Header from "~/features/profile/components/Header";
import Information from "~/features/profile/components/Information";
import Listings from "~/features/profile/components/Listings";
import FooterSmall from "~/components/footer-small";
import { data, LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated, refreshToken } from "~/api/server.auth";
import { getProfileInformation } from "~/features/profile/api/server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });

    const { id } = params;

    const token = await refreshToken({ request });

    try {
        const res = await getProfileInformation({
            id: Number(id),
            token: token?.data?.access_token!
        });

        return data({
            ...res.data
        });

    } catch (error) {
        throw new Response(null, {
            status: 404
        });
    }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => (
    [{ title: data?.profile?.full_name }]
)

export default function Page() {
    const data = useLoaderData<typeof loader>();

    return (
        <>
            <NavbarSmall />
            <main className={styles.profilePage}>
                <Header
                    pfp_url={data.profile?.profile_picture_url!}
                    name={data.profile?.full_name!}
                    bio={data.profile?.information?.bio}
                    user_id={data.profile?.id!}
                />
                <div className={styles.profileContent}>
                    <Information
                        major={data.profile?.information?.major || ""}
                        semester={data.profile?.information?.semester || -1}
                        instagram={data.profile?.information?.instagram || ""}
                    />
                    <Listings
                        user_id={data.profile?.id!}
                    />
                </div>
            </main>
            <FooterSmall />
        </>
    )
}