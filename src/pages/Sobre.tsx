import { motion } from 'framer-motion';
import { Trophy, Users, ShieldCheck, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import igorCeo from '@/assets/igor-ceo.jpeg';

const Sobre = () => {
  return (
    <>
      <SEOHead
        title="Quem Somos – A Vitrine da Estética Automotiva em Uberlândia"
        description="Conheça a Prime Detail: centro de estética automotiva premium em Uberlândia com mais de 5.000 veículos transformados. Técnicos certificados em polimento, vitrificação e PPF."
      />

      {/* Hero */}
      <section className="py-20 md:py-32 bg-card overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="h-1 w-16 brand-gradient mb-6" />
              <h1 className="text-4xl md:text-6xl font-heading mb-6 text-white leading-tight">
                Obsessão pelo <span className="text-gradient-brand">Detalhe</span> em Uberlândia
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A Prime Detail nasceu da união entre a paixão por automóveis e a busca pela perfeição estética.
                Localizada no coração de Uberlândia, somos mais que um centro de serviços; somos especialistas em prolongar a vida
                e o brilho do seu veículo com o que há de mais moderno no mundo.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl md:text-4xl font-heading text-primary">+ de 5.000</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-condensed">Carros Transformados</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] md:aspect-square bg-secondary rounded-lg border border-border overflow-hidden"
            >
              <img
                src={igorCeo}
                alt="Igor, fundador e CEO da Prime Detail, centro de estética automotiva em Uberlândia"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-heading text-xl uppercase tracking-wider">Igor</p>
                <p className="text-primary text-xs uppercase tracking-widest font-condensed font-bold">Diretor Técnico & Fundador</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-heading mb-16 text-center text-white">
            Nossos <span className="text-gradient-brand">Valores Centrais</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, title: 'Excelência', text: 'Não aceitamos o "bom o suficiente". Buscamos a perfeição em cada centímetro.' },
              { icon: ShieldCheck, title: 'Proteção', text: 'Usamos tecnologias que garantem proteção real contra o desgaste do tempo.' },
              { icon: Heart, title: 'Paixão', text: 'Tratamos cada carro como se fosse nosso. Cuidado que vem de dentro.' },
              { icon: Users, title: 'Confiança', text: 'Transparência total em cada diagnóstico e orçamento apresentado.' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-card border border-border group hover:border-primary/40 transition-colors"
              >
                <v.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl text-white mb-3 uppercase tracking-wider">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sobre;
