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
    file?: File;
    color_code?: string;
}

export type SizeOption = {
    name: string;
    specifications?: SizeSpecs;
}

export type SizeSpecs = {
    shoulders?: number;
    chest?: number;
    waist?: number;
    hip?: number;
    length?: number;
    sleeve_length?: number;
    insteam?: number;
}

export type ModelOption = {
    name: string;
}