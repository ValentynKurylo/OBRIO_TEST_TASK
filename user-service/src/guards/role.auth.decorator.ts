import {SetMetadata} from "@nestjs/common";

export const ROLE_KEY = "roles"

export const Role = (...Role: string[]) => SetMetadata(ROLE_KEY, Role)