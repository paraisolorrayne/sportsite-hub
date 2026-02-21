import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import heroImage from '@/assets/hero-car.jpg';

const features = [
  {
    icon: Zap,
    title: 'Performance',
    description: 'Polimento e proteção que maximizam o brilho e a durabilidade do seu veículo.',
  },
  {
    icon: Shield,
    title: 'Proteção',
    description: 'Coating cerâmico e PPF que blindam a pintura contra riscos e intempéries.',
  },
  {
    icon: Star,
    title: 'Excelência',
    description: 'Produtos premium e técnicas profissionais para resultados incomparáveis.',
  },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Home"
        description="SpeedAuto - Estética automotiva de alta performance. Polimento, coating cerâmico e proteção premium para seu veículo."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'SpeedAuto',
          description: 'Estética automotiva de alta performance',
          address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP' },
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 racing-gradient mb-6"
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading leading-tight mb-6">
              Estética Automotiva de{' '}
              <span className="text-gradient-racing">Alta Performance</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg font-body">
              Transformamos cada detalhe do seu veículo com técnicas profissionais e produtos premium.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 px-8 py-4 racing-gradient text-primary-foreground font-condensed uppercase tracking-wider text-sm hover:opacity-90 transition-opacity glow-primary"
              >
                Nossos Serviços <ArrowRight size={16} />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-condensed uppercase tracking-wider text-sm hover:bg-secondary transition-colors"
              >
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading mb-4">
              Por que <span className="text-gradient-racing">escolher</span> a SpeedAuto?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Combinamos paixão por carros com tecnologia de ponta.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 bg-secondary border border-border hover:border-primary/30 transition-colors group"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-heading mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 racing-gradient opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading mb-6">
              Pronto para transformar seu veículo?
            </h2>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-10 py-4 racing-gradient text-primary-foreground font-condensed uppercase tracking-wider hover:opacity-90 transition-opacity glow-primary"
            >
              Agende seu horário <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
