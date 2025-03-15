import { Store } from "~/types/globals";
import { Location } from "~/types/location";

export type RegisterStoreBody = {
    name: string;
    store_location: Location;
}

export type RegisterStoreResponse = {
    store: Store;
}