import { motion } from 'framer-motion';
import { Sparkles, Droplets, PaintBucket, ShieldCheck } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const services = [
  {
    icon: Sparkles,
    title: 'Polimento Técnico',
    description: 'Remoção de riscos, hologramas e imperfeições com polimento em etapas progressivas.',
    price: 'A partir de R$ 500',
  },
  {
    icon: ShieldCheck,
    title: 'Coating Cerâmico',
    description: 'Proteção de longa duração com nanotecnologia cerâmica que repele água e sujeira.',
    price: 'A partir de R$ 1.200',
  },
  {
    icon: PaintBucket,
    title: 'PPF - Proteção de Pintura',
    description: 'Película protetora transparente que blinda a pintura contra pedras e riscos.',
    price: 'Sob consulta',
  },
  {
    icon: Droplets,
    title: 'Higienização Completa',
    description: 'Limpeza profunda interna e externa com produtos premium e técnicas profissionais.',
    price: 'A partir de R$ 300',
  },
];

const Servicos = () => {
  return (
    <>
      <SEOHead
        title="Serviços"
        description="Conheça nossos serviços de estética automotiva: polimento, coating cerâmico, PPF e higienização completa."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.title,
            description: s.description,
          })),
        }}
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="h-1 w-16 racing-gradient mb-6" />
            <h1 className="text-4xl md:text-6xl font-heading mb-4">
              Nossos <span className="text-gradient-racing">Serviços</span>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Soluções completas para proteger e valorizar seu veículo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-card border border-border hover:border-primary/40 transition-all group"
              >
                <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-heading mb-3">{service.title}</h2>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                <span className="font-condensed text-sm text-accent uppercase tracking-wider">
                  {service.price}
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicos;
