import {SetMetadata} from "@nestjs/common";
import {RolesEnum} from "../roles/roles.enum";

export const ROLES_KEY = 'role'
export const Roles = ([...roles]: RolesEnum[]) => SetMetadata(ROLES_KEY, roles)