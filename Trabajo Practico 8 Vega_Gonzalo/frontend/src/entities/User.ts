import { Role } from "./Role";

export default interface User{
    email: string,
    password: string,
    fullName: string,
    role : Role | null
}

