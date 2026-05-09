import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">Whatsapp</span>
                <span> xxx-xxx-xxxx</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">Dirección</span>
                <span>xxx xxx xxx</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">Email</span>
                <span>xxx@xxx.xxx</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  Polí­ticas de privacidad
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  Polí­ticas de cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* About/Extra */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Tienda Funavid</h3>
            <p className="text-sm">
              Tu tienda de confianza para los mejores productos. Calidad y servicio excepcional garantizados en cada compra.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Tienda Funavid. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
