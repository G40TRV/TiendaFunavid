import { useState } from "preact/hooks";

//consolida a los usuarios de la pagina
const users = [
  { username: "admin", password: "123456", role: "admin" }
];

export const useLoginForm = (setIsAuth, setUser) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //validarDatos: FunciÃ³n que valida los datos ingresados por el usuario.
  const validarDatos = (e) => {
    e.preventDefault();
    //compara si el usuario y constraseÃ±a puestos coinciden con los de la base de datos.
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!username || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    //mostrar mensaje de error si los datos son incorrectos
    if (user) {
      setIsAuth(true);
      setUser(user);
      // Persistencia: Guardar en localStorage
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setError("Usuario o contraseÃ±a incorrectos");
      // Limpia la variable de error despuÃ©s de 3 segundos. 
      setTimeout(() => setError(""), 3000);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    validarDatos
  };
};
