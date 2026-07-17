import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4 mt-auto">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid — solo Marca y Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-black text-white mb-4">
              <ShieldCheck className="text-blue-400 w-7 h-7" />
              <span>TRUSTPHONE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Expertos en smartphones reacondicionados con los más altos estándares de calidad.
            </p>
            {/* Redes sociales con links a sitios oficiales */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>contacto@trustphone.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>+503 7000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>San Salvador, El Salvador</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TRUSTPHONE. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link to="#" className="hover:text-gray-300 transition-colors">Privacidad</Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">Términos y condiciones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
