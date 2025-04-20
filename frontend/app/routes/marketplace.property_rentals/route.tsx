import styles from "./styles.module.scss";
import PropertiesMap from "~/features/marketplace/components/PropertiesMap/index.client";
import { ClientOnly } from "remix-utils/client-only";

export default function Page() {
    return (
        <div className="w-full h-full">
           <ClientOnly>
                {() => <PropertiesMap />}
           </ClientOnly>
        </div>
    )
}