import { motion } from 'framer-motion';
import { Trophy, Users, ShieldCheck, Heart, Warehouse, Lightbulb, Sparkles, CarFront } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import igorCeo from '@/assets/igor-ceo.jpeg';
import motoImage from '@/assets/sobre/moto.jpg';
import timeImage from '@/assets/sobre/time.jpg';

// Imagens do espaço
import espacoRecepcao from '@/assets/espaco/recepcao.jpeg';
import espacoAreaServico from '@/assets/espaco/area-servico.jpeg';
import espacoCorredorIluminado from '@/assets/espaco/corredor-iluminado.jpeg';
import espacoPorscheNoEspaco from '@/assets/espaco/porsche-no-espaco.jpeg';
import espacoBayLavagem from '@/assets/espaco/bay-lavagem.jpeg';
import espacoPorscheElevador from '@/assets/espaco/porsche-elevador.jpeg';

const espacoFeatures = [
  {
    icon: Warehouse,
    title: 'Estrutura Ampla',
    text: 'Mais de 300m² projetados com piso modular profissional, garantindo organização e segurança para cada veículo.',
  },
  {
    icon: Lightbulb,
    title: 'Iluminação Profissional',
    text: 'Painéis LED hexagonais e barras de luz vertical calibradas para inspeção minuciosa de cada detalhe da pintura.',
  },
  {
    icon: Sparkles,
    title: 'Ambiente Controlado',
    text: 'Climatização dedicada e área coberta que protegem o veículo durante todo o processo de transformação.',
  },
  {
    icon: CarFront,
    title: 'Elevador Automotivo',
    text: 'Elevador pantográfico profissional que permite acesso 360° ao veículo, alcançando cada detalhe escondido.',
  },
];

const espacoImages = [
  { src: espacoRecepcao, alt: 'Recepção Prime Detail com logo iluminada e sofás premium em Uberlândia', label: 'Recepção' },
  { src: espacoAreaServico, alt: 'Área de serviço com piso modular profissional e iluminação LED', label: 'Área de Serviço' },
  { src: espacoCorredorIluminado, alt: 'Corredor iluminado com iluminação lateral LED no centro de estética automotiva', label: 'Corredor Técnico' },
  { src: espacoPorscheNoEspaco, alt: 'Porsche 911 no espaço Prime Detail para polimento e vitrificação', label: 'Detalhamento Premium' },
  { src: espacoBayLavagem, alt: 'Bay de lavagem e preparação com carro no elevador hidráulico', label: 'Bay de Preparação' },
  { src: espacoPorscheElevador, alt: 'Porsche 911 no elevador automotivo sendo higienizado por técnico', label: 'Elevador Profissional' },
];

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

      {/* Gallery Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-heading mb-6 text-white uppercase">
              Nosso <span className="text-gradient-brand">Universo</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Dos superesportivos de duas rodas aos sedãs de luxo, nossa equipe está preparada para entregar o melhor resultado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={motoImage}
                alt="Detalhamento em motocicletas de alta performance"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <h4 className="text-white font-heading text-xl uppercase">Performance em Duas Rodas</h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={timeImage}
                alt="Nossa equipe de especialistas"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <h4 className="text-white font-heading text-xl uppercase">Equipe de Especialistas</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nosso Espaço */}
      <section className="py-24 bg-card overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-1 w-16 brand-gradient mb-6" />
              <h2 className="text-3xl md:text-5xl font-heading text-white uppercase leading-tight">
                Nosso <span className="text-gradient-brand">Espaço</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                Projetado para entregar excelência em cada serviço, nosso espaço combina
                infraestrutura profissional com uma estética pensada para quem valoriza o cuidado automotivo.
                Cada detalhe do ambiente foi planejado para garantir o melhor resultado para o seu carro — e a melhor experiência para você.
              </p>
            </motion.div>
          </div>

          {/* Mosaic Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-20">
            {/* Image 1 — Recepção (wide) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="sm:col-span-2 row-span-1 relative aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={espacoImages[0].src}
                alt={espacoImages[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                <span className="text-white font-heading text-sm md:text-base uppercase tracking-wider">{espacoImages[0].label}</span>
              </div>
            </motion.div>

            {/* Image 2 — Área Serviço (wide) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="sm:col-span-2 row-span-1 relative aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={espacoImages[1].src}
                alt={espacoImages[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                <span className="text-white font-heading text-sm md:text-base uppercase tracking-wider">{espacoImages[1].label}</span>
              </div>
            </motion.div>

            {/* Image 3 — Corredor (regular) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={espacoImages[2].src}
                alt={espacoImages[2].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                <span className="text-white font-heading text-sm md:text-base uppercase tracking-wider">{espacoImages[2].label}</span>
              </div>
            </motion.div>

            {/* Image 4 — Porsche vertical (tall) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[3/4] sm:aspect-auto sm:row-span-2 rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={espacoImages[3].src}
                alt={espacoImages[3].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                <span className="text-white font-heading text-sm md:text-base uppercase tracking-wider">{espacoImages[3].label}</span>
              </div>
            </motion.div>

            {/* Image 5 — Bay Lavagem (regular) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={espacoImages[4].src}
                alt={espacoImages[4].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                <span className="text-white font-heading text-sm md:text-base uppercase tracking-wider">{espacoImages[4].label}</span>
              </div>
            </motion.div>

            {/* Image 6 — Porsche Elevador (regular) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[4/3] sm:aspect-auto rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={espacoImages[5].src}
                alt={espacoImages[5].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                <span className="text-white font-heading text-sm md:text-base uppercase tracking-wider">{espacoImages[5].label}</span>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {espacoFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-lg border border-border bg-secondary/30 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <feature.icon className="w-9 h-9 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <h3 className="font-heading text-lg text-white mb-2 uppercase tracking-wider relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{feature.text}</p>
              </motion.div>
            ))}
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
