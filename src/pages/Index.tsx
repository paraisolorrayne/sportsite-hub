import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Trophy, Camera, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import heroImage from '@/assets/banner.jpeg';

const features = [
  {
    icon: ShieldCheck,
    title: 'Produtos Premium',
    description: 'Utilizamos apenas as melhores marcas mundiais para garantir durabilidade e brilho extremo.',
  },
  {
    icon: Trophy,
    title: 'Técnicos Certificados',
    description: 'Nossa equipe possui certificações internacionais nas mais avançadas técnicas de detalhamento.',
  },
  {
    icon: Star,
    title: 'Análise Técnica',
    description: 'Cada carro é único. Realizamos uma análise técnica antes de qualquer procedimento.',
  },
];

const homeServices = [
  { title: 'Lavagem Detalhada', path: '/servicos/lavagem-detalhada' },
  { title: 'Higienização Interna', path: '/servicos/higienizacao-interna' },
  { title: 'Polimento Técnico', path: '/servicos/polimento-tecnico' },
  { title: 'Vitrificação de Pintura', path: '/servicos/vitrificacao-pintura' },
  { title: 'PPF (Proteção)', path: '/servicos/ppf-protecao-pintura' },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Estética Automotiva de Alta Performance em Uberlândia"
        description="A Prime Detail é referência em polimento, vitrificação e proteção de pintura (PPF) em Uberlândia. Cuidado premium para quem exige o melhor do seu veículo."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Prime Detail',
          image: heroImage,
          url: 'https://primedetail.com.br',
          telephone: '+5534984033956',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Uberlândia, MG',
            addressLocality: 'Uberlândia',
            addressRegion: 'MG',
            postalCode: '38400-000',
            addressCountry: 'BR'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -18.9113,
            longitude: -48.2622
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00'
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/70 md:bg-transparent md:bg-gradient-to-r md:from-black md:via-black/70 md:to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 brand-gradient mb-6"
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading leading-tight mb-6 uppercase">
              Estética Automotiva de{' '}
              <span className="text-gradient-brand">Alta Performance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg font-body">
              A vitrine premium de cuidados automotivos em Uberlândia. Proteção, conservação e estética de nível internacional.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/5534984033956"
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero-whatsapp"
                className="inline-flex items-center gap-2 px-8 py-4 brand-gradient text-white font-condensed uppercase tracking-wider text-base hover:opacity-90 transition-opacity glow-brand"
              >
                Pedir Orçamento agora <ArrowRight size={16} />
              </a>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-condensed uppercase tracking-wider text-base hover:bg-white/10 transition-colors"
              >
                Conhecer Serviços
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-heading mb-2 text-white">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-heading mb-4 text-white">
                Serviços <span className="text-gradient-brand">Especializados</span>
              </h2>
              <p className="text-muted-foreground">
                Do polimento corretivo à proteção de última geração com PPF e Cerâmico em Uberlândia.
              </p>
            </div>
            <Link to="/servicos" className="text-primary hover:underline font-condensed uppercase tracking-widest text-sm flex items-center gap-2">
              Ver todos serviços <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {homeServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={service.path}
                  className="group block p-8 bg-card border border-border hover:border-primary/50 transition-all text-center h-full"
                >
                  <div className="w-12 h-12 brand-gradient rounded-full mx-auto mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-lg text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social / Números */}
      <section className="py-24 brand-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: '+ de 5.000', label: 'Carros Transformados' },
              { val: '100%', label: 'Garantia de Qualidade' },
              { val: '4.9/5', label: 'Avaliação Clientes' },
              { val: 'Premium', label: 'Produtos Importados' },
            ].map((stat, i) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-heading mb-2">{stat.val}</div>
                <div className="text-xs md:text-sm uppercase tracking-widest opacity-80 font-condensed font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading text-white">
              Seu carro merece o <span className="text-gradient-brand">brilho de um novo</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Estamos em Uberlândia prontos para transformar seu veículo. Clique abaixo para uma consultoria técnica via WhatsApp.
            </p>
            <div className="pt-4">
              <a
                href="https://wa.me/5534984033956"
                target="_blank"
                rel="noopener noreferrer"
                data-cta="bottom-whatsapp"
                className="inline-flex items-center gap-3 px-10 py-5 brand-gradient text-white font-heading text-xl uppercase tracking-wider glow-brand animate-float"
              >
                Agendar via WhatsApp
              </a>
            </div>
            <div className="flex justify-center flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="text-primary w-4 h-4" /> Atendimento Personalizado
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="text-primary w-4 h-4" /> Produtos Importados
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="text-primary w-4 h-4" /> Uberlândia - MG
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
