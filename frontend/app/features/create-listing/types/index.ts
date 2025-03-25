export type CreateListingPrice = {
    min_units?: number;
    max_units?: number;
    price?: number;
}

export type CustomOptions = {
    color?: ColorOption[];
    size?: SizeOption[];
    model?: ModelOption[];
}

export type ColorOption = {
    name: string;
    local_uri?: string;
    color_code?: string;
}

export type SizeOption = {
    name: string;
}

export type ModelOption = {
    name: string;
}