import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import User from "../../entities/User";

export const RutaPrivada = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User>(sessionStorage.getItem('user') as unknown as User);

    return user ? children : <Navigate to='/login' />;
};