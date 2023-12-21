import {Attribute} from "../creature/get/attribute";
import {Expose} from "class-transformer";

export class FiltersListDto {
    @Expose()
    filter_cat: string

    @Expose()
    filter_values: Attribute[]
}