import { RiCheckboxCircleFill, RiArrowRightLine } from '@remixicon/react'

//sucess page: esta pagina verifica que el pago se haya realizado correctamente
export const SuccessPage = ({ 
    onContinue,
    title = "¡Pago Exitoso!",
    message = "Tu orden ha sido procesada correctamente y te hemos enviado un correo con los detalles de la compra."
}) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-10 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RiCheckboxCircleFill className="w-14 h-14 text-cyan-500" />
                </div>
                {/* Mensaje de pago exitoso */}
                <h1 className="text-3xl font-black text-slate-900 mb-2">{title}</h1>
                <p className="text-slate-500 mb-8 font-medium">
                    {message}
                </p>
                {/* Generar un numero de confirmacion aleatorio*/}
                <div className="bg-slate-50 rounded-2xl p-4 mb-8">
                    <p className="text-sm text-slate-500">NÃºmero de confirmaciÃ³n</p>
                    <p className="text-lg font-mono font-bold text-slate-900 mt-1">#SM-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                </div>
                {/* Boton para volver a la tienda */}
                <button
                    onClick={onContinue}
                    className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg group"
                >
                    Volver a la tienda
                    <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    )
}
