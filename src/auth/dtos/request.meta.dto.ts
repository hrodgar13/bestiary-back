import {MetaDto} from "../../shared/dtos/meta.dto";
import {Request} from "../entities/messages.entity";

export class RequestMetaDto {
    data: Request[]
    meta: MetaDto
}