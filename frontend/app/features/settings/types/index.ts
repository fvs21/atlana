import { UserInformation } from "~/types/globals";

export type EditableInformation = Omit<UserInformation, "university">;