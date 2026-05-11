import { useState, useRef } from 'preact/hooks';
import { RiSendPlaneFill, RiCheckboxCircleFill } from '@remixicon/react';
import emailjs from '@emailjs/browser';

export const VolunteerView = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // CONFIGURACIÃ“N DE EMAILJS (Reemplaza con tus datos)
        const serviceID = 'service_pmwvdhe'; // Reemplazar
        const templateID = 'template_gfk3csk'; // Reemplazar
        const publicKey = 'IU430z67AufX05OIW'; // Reemplazar

        emailjs.sendForm(serviceID, templateID, form.current, publicKey)
            .then((result) => {
                console.log('Correo enviado:', result.text);
                setIsSubmitting(false);
                setSuccess(true);
            }, (error) => {
                console.log('Error enviando correo:', error.text);
                setIsSubmitting(false);
                alert("Hubo un error al enviar el formulario. Por favor intenta de nuevo.");
            });
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] p-10 text-center animate-in zoom-in-95 duration-500">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">¡Gracias por unirte!</h2>
                    <p className="text-slate-500 mb-8 font-medium">Hemos recibido tus datos correctamente. Pronto nos pondremos en contacto contigo para contarte sobre las próximas oportunidades de voluntariado en Funavid.</p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="w-full py-3.5 rounded-xl font-bold bg-cyan-600 text-white shadow-md hover:bg-cyan-700 transition-colors"
                    >
                        Volver a enviar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col lg:flex-row">

                    {/* Columna Izquierda - Mensaje */}
                    <div className="lg:w-5/12 bg-slate-50/50 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200/60">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8 leading-tight">
                            Volunteer for Funavid! <br />
                            <span className="text-cyan-600">We need help to keep going and growing!</span>
                        </h2>

                        <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
                            <p>
                                ¿Te interesa colaborar con Funavid? Ofrecemos oportunidades de voluntariado para personas con diversos intereses y habilidades. Rellena el formulario a continuación y nos pondremos en contacto contigo para darte más detalles.
                            </p>
                            <p>
                                Si eres estudiante de secundaria, puedes ganar horas de servicio comunitario cuando ayudas en Funavid.
                            </p>
                        </div>
                    </div>

                    {/* Columna Derecha - Formulario */}
                    <div className="lg:w-7/12 p-8 sm:p-12 lg:p-16 bg-white">
                        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        name="first_name"
                                        required
                                        pattern="^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃ Ã‰Ã Ã“ÃšÃ±Ã‘\s]+$"
                                        title="Solo se permiten letras en este campo"
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-white transition-colors text-slate-700 placeholder:text-slate-400"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="last_name"
                                        required
                                        pattern="^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃ Ã‰Ã Ã“ÃšÃ±Ã‘\s]+$"
                                        title="Solo se permiten letras en este campo"
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-white transition-colors text-slate-700 placeholder:text-slate-400"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-white transition-colors text-slate-700 placeholder:text-slate-400"
                                    placeholder="Email"
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    pattern="[0-9]{7,15}"
                                    title="El telÃ©fono debe contener solo nÃºmeros (7-15 dÃ­gitos)"
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-white transition-colors text-slate-700 placeholder:text-slate-400"
                                    placeholder="Phone number"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    rows="5"
                                    required
                                    minLength="25"
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-white transition-colors resize-none text-slate-700 placeholder:text-slate-400"
                                    placeholder="Tell us why you want to volunteer (Minimum 25 characters)"
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <div className="flex items-center h-6 mt-0.5">
                                    <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                                </div>
                                <label className="text-base font-medium text-slate-700">
                                    I agree to the terms and conditions
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 text-xl ${isSubmitting ? 'bg-cyan-400 cursor-not-allowed shadow-none' : 'bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-500/40 hover:-translate-y-0.5'}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
