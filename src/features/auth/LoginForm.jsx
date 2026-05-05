import { RiUser3Line, RiLockPasswordLine, RiLoginBoxLine, RiHeartPulseLine } from "@remixicon/react";
import { useLoginForm } from "./useLoginForm";

//Login: Es el formulario de inicio de sesiÃ³n.

function Login({ setIsAuth, setUser }) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    validarDatos
  } = useLoginForm(setIsAuth, setUser);

  return (
    // Contenedor principal
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-950 to-slate-950" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-700">

        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-6">
            <RiHeartPulseLine className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Bienvenido a <span className="text-cyan-500">SaludMart</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* formulario de login */}
        <form onSubmit={validarDatos} className="space-y-6">

          {/* estilo del mensaje de erros */}
          <div className={`transition-all duration-300 overflow-hidden ${error ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RiUser3Line className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
              </div>
              {/*input para ingresar el usuario*/}
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:bg-slate-900/80 transition-all font-medium"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-slate-500" />
              </div>
              {/*input para ingresar la contraseÃ±a*/}
              <input
                type="password"
                placeholder="ContraseÃ±a"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:bg-slate-900/80 transition-all font-medium"
              />
            </div>
          </div>
          {/* BotÃ³n de Iniciar SesiÃ³n */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-sky-600 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            Iniciar sesiÃ³n
            <RiLoginBoxLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* info de usuarios en Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Credenciales de administrador: <br />
            <span className="text-slate-400">admin:123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
