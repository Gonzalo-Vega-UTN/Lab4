import User from "../entities/User";

class AuthService {
  static async login(user: User) {
    let urlServer = 'http://localhost:8080/api/auth/login';
    const response = await fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": 'application/json'
      },
      mode: "cors"
    });
    if (!response.ok) {
      // Lanza un error con la respuesta del servidor si el estado HTTP no es 2xx
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
  }

  return await response.json() as User;
  }

  static async register(user: User) {
    let urlServer = 'http://localhost:8080/api/auth/register';
    const response = await fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": 'application/json'
      },
      mode: "cors"
    });

    if (!response.ok) {
      // Lanza un error con la respuesta del servidor si el estado HTTP no es 2xx
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
  }

  return await response.json() as User;
  }

  static async modifyRole(admin: User, email: string) {
    let urlServer = 'http://localhost:8080/api/auth/admin/' + email;
    const response = await fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": 'application/json'
      },
      mode: "cors"
    });

    if (!response.ok) {
      // Lanza un error con la respuesta del servidor si el estado HTTP no es 2xx
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
  }

  return await response.json() as User;
  }
}

export default AuthService;
