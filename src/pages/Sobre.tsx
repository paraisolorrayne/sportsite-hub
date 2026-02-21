import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

const Sobre = () => {
  return (
    <>
      <SEOHead
        title="Sobre"
        description="Conheça a SpeedAuto - estética automotiva com mais de 10 anos de experiência em cuidados premium para veículos."
      />

      {/* Hero */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="h-1 w-16 racing-gradient mb-6" />
            <h1 className="text-4xl md:text-6xl font-heading mb-6">
              Sobre a <span className="text-gradient-racing">SpeedAuto</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nascemos da paixão por automóveis e da busca incansável pela perfeição.
              Com mais de 10 anos de experiência, somos referência em estética automotiva
              de alta performance na região.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-12 text-center">
            Nossos <span className="text-gradient-racing">Valores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Excelência', text: 'Cada detalhe importa. Não paramos até atingir a perfeição.' },
              { title: 'Transparência', text: 'Comunicação clara sobre processos, produtos e valores.' },
              { title: 'Inovação', text: 'Sempre atualizados com as melhores técnicas e produtos do mercado.' },
              { title: 'Paixão', text: 'Amamos o que fazemos e isso se reflete em cada trabalho.' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-card border border-border"
              >
                <h3 className="font-heading text-lg text-primary mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sobre;
