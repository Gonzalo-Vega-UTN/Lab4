import { Role } from "./Role";

export default interface User{
    id: number | null,
    email: string,
    password: string,
    fullName: string,
    role : Role | null
}

