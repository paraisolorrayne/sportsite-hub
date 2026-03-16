import { motion } from 'framer-motion';
import { Instagram, Phone, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';

// Let's use a standard FontAwesome-like WhatsApp color or a generic green circle
const WhatsappIconColored = () => (
  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
    <Phone className="w-5 h-5 text-white" fill="white" />
  </div>
);

const MapsIconColored = () => (
  <div className="w-10 h-10 rounded-xl bg-[#EA4335] flex items-center justify-center flex-shrink-0">
    <MapPin className="w-6 h-6 text-white" fill="white" />
  </div>
);

const InstagramIconColored = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center flex-shrink-0">
    <Instagram className="w-6 h-6 text-white" />
  </div>
);

const LinkButton = ({ 
  href, 
  icon: Icon, 
  title, 
  delay 
}: { 
  href: string; 
  icon: React.ElementType; 
  title: string; 
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(92, 85, 75, 0.9)' }}
    whileTap={{ scale: 0.98 }}
    className="relative flex items-center w-full p-2 mb-4 bg-[#5c554b]/80 backdrop-blur-md rounded-lg overflow-hidden border border-white/5 transition-all group"
  >
    {/* Icon Container (Left) */}
    <div className="absolute left-2 flex items-center justify-center">
      <Icon />
    </div>

    {/* Title Container (Center) */}
    <div className="flex-1 text-center py-3 px-14">
      <span className="text-white font-medium text-[15px] tracking-wide">{title}</span>
    </div>

    {/* More Options Container (Right) */}
    <div className="absolute right-3 flex items-center justify-center text-white/50 group-hover:text-white/80 transition-colors">
      <MoreVertical className="w-4 h-4" />
    </div>
  </motion.a>
);

const Links = () => {
  // Configurações de Links
  const WHATSAPP_URL = "https://wa.me/5534984033956?text=Ol%C3%A1%21+Vim+pelo+link+do+Instagram+e+gostaria+de+atendimento.";
  const INSTAGRAM_URL = "https://www.instagram.com/primedetaill/";
  const MAPS_URL = "https://maps.app.goo.gl/qyiARzGzfQNJpAmHA";

  useEffect(() => {
    // Definir background do body para preto especificamente nesta página
    document.body.style.backgroundColor = '#000000';
    return () => {
      document.body.style.backgroundColor = ''; // Restaura ao desmontar
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Links Prime Detail - Estética Automotiva Uberlândia" 
        description="Tecnologias revolucionárias para seu carro! Nossa missão é te surpreender!" 
      />
      
      <main className="min-h-screen bg-black w-full flex flex-col items-center py-12 px-4 selection:bg-primary/30">
        
        {/* Container Centralizado (max largura estilo mobile) */}
        <div className="w-full max-w-[680px] flex flex-col items-center">
          


          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/10 bg-black mb-6 shadow-[0_0_30px_rgba(0,163,255,0.15)] flex items-center justify-center p-2"
          >
            <img 
              src="/logo_prime.png" 
              alt="Prime Detail Logo" 
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Título & Descrição */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-white text-xl sm:text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              Prime Detail <span className="text-xl">💎</span> Excelência em estética
            </h1>
            <p className="text-gray-300 text-[15px] sm:text-base font-normal max-w-[400px] leading-relaxed mx-auto px-4">
              Tecnologias revolucionárias para seu carro! Nossa missão é te surpreender!
            </p>
          </motion.div>

          {/* Redes Sociais Menores (Logo abaixo do texto) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <Phone className="w-6 h-6" />
            </a>
          </motion.div>

          {/* Botões Principais */}
          <div className="w-full flex flex-col items-center">
            <LinkButton 
              href={WHATSAPP_URL}
              icon={WhatsappIconColored}
              title="Fale com nossa equipe!"
              delay={0.3}
            />
            <LinkButton 
              href={MAPS_URL}
              icon={MapsIconColored}
              title="Localização"
              delay={0.4}
            />
            <LinkButton 
              href={INSTAGRAM_URL}
              icon={InstagramIconColored}
              title="Instagram"
              delay={0.5}
            />
          </div>

          {/* Footer Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <a 
              href="/" 
              className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Acessar site completo
            </a>
            <div className="text-xs text-gray-500 font-medium">
              © {new Date().getFullYear()} Prime Detail
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
};

export default Links;
