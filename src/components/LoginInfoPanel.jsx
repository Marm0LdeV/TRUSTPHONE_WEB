import { ShieldCheck, Star, Truck, Shield } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Calidad Garantizada',
    description: 'Dispositivos certificados con más de 30 puntos de verificación técnica.',
    color: 'bg-amber-400',
    bgLight: 'bg-amber-100',
  },
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'Envío completamente gratis en todos los pedidos a nivel nacional.',
    color: 'bg-emerald-400',
    bgLight: 'bg-emerald-100',
  },
  {
    icon: Shield,
    title: '1 Año de Garantía',
    description: 'Cobertura total ante cualquier falla técnica durante el primer año.',
    color: 'bg-blue-400',
    bgLight: 'bg-blue-100',
  },
];

export default function LoginInfoPanel() {
  return (
    <div className="relative flex flex-col justify-between h-full p-10 lg:p-14">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      {/* Brand */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">TRUSTPHONE</span>
        </div>

        {/* Hero text */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
            Tu próximo
            <br />
            celular,
            <br />
            <span className="text-amber-300">con confianza.</span>
          </h1>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-md">
            Cada dispositivo es revisado y certificado por nuestros expertos para
            ofrecerte la mejor experiencia con total tranquilidad.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex items-start gap-4 group">
              <div
                className={`${feature.bgLight} bg-white/20 backdrop-blur-sm rounded-xl p-2.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{feature.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
