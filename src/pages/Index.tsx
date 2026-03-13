import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Trophy, HelpCircle, Search, Award, Wrench, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '@/components/SEOHead';
import heroImage from '@/assets/banner.jpeg';
import cuidadoImage from '@/assets/espaco/bay-lavagem.jpeg';

const HERO_VIDEO = '/videos/ppf-interno-hero.mp4';
const PROCESS_VIDEO = '/videos/processo-detail.mp4';

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

const whyChooseUs = [
  {
    icon: Search,
    title: 'Diagnóstico técnico gratuito',
    description: 'Antes de qualquer serviço, analisamos a pintura do seu veículo e explicamos exatamente o que seu carro precisa — sem compromisso.',
  },
  {
    icon: Award,
    title: 'Produtos de linha profissional',
    description: 'Trabalhamos exclusivamente com marcas referência mundial em estética automotiva, como Ceramic Pro, Gyeon e Koch Chemie.',
  },
  {
    icon: Wrench,
    title: 'Mais de 5.000 veículos atendidos',
    description: 'Experiência comprovada com carros de todas as marcas em Uberlândia, de populares a superesportivos. Cada carro recebe atenção individual.',
  },
  {
    icon: FileCheck,
    title: 'Garantia documentada',
    description: 'Cada serviço inclui certificado de garantia e orientações de manutenção para você manter o resultado por mais tempo.',
  },
];

const homeFaqs = [
  {
    q: 'Quanto tempo dura a vitrificação de pintura?',
    a: 'A vitrificação cerâmica 9H aplicada na Prime Detail tem durabilidade de 2 a 5 anos, dependendo do produto escolhido e dos cuidados de manutenção. Durante esse período, a proteção repele sujeira, raios UV e contaminantes, mantendo o brilho da pintura.',
  },
  {
    q: 'Qual a diferença entre PPF e película comum?',
    a: 'O PPF (Paint Protection Film) é uma película de poliuretano termoplástico transparente, aplicada diretamente na pintura para proteger contra impactos de pedras, riscos e desgaste. Diferente da película de controle solar (aplicada nos vidros), o PPF possui propriedade autorregenerativa: riscos superficiais desaparecem com o calor.',
  },
  {
    q: 'Preciso agendar antes de levar o carro?',
    a: 'Sim, recomendamos agendamento prévio via WhatsApp para garantir atendimento exclusivo. Cada veículo recebe atenção individual, e o agendamento permite que nossa equipe prepare os materiais e o espaço adequado para o seu serviço.',
  },
  {
    q: 'O polimento risca a pintura do carro?',
    a: 'Não. O polimento técnico realizado na Prime Detail utiliza máquinas rotativas e orbitais profissionais com massas de corte de alta tecnologia. O processo remove micro-riscos, hologramas e marcas de lavagem, restaurando o brilho original sem danificar o verniz.',
  },
  {
    q: 'Vocês atendem apenas carros de luxo?',
    a: 'Não. Atendemos todas as marcas e modelos — de populares a superesportivos. Cada veículo merece cuidado profissional, e adaptamos nossos serviços às necessidades específicas de cada pintura e acabamento.',
  },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Estética Automotiva de Alta Performance em Uberlândia"
        description="A Prime Detail é especialista em polimento técnico, vitrificação de pintura (ceramic coating 9H), PPF e estética automotiva premium em Uberlândia. Agende sua avaliação gratuita via WhatsApp."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AutoRepair',
          name: 'Prime Detail – Estética Automotiva',
          description: 'A Prime Detail é uma empresa de estética automotiva em Uberlândia especializada em polimento técnico, vitrificação de pintura (ceramic coating 9H) e proteção PPF para veículos premium.',
          image: heroImage,
          url: 'https://primedetail.com.br',
          telephone: '+5534984033956',
          email: 'contato@primedetail.com.br',
          priceRange: 'R$ 150 - R$ 5.000+',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Uberlândia, MG',
            addressLocality: 'Uberlândia',
            addressRegion: 'MG',
            postalCode: '38400-000',
            addressCountry: 'BR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -18.9113,
            longitude: -48.2622,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00',
          },
          sameAs: [
            'https://www.instagram.com/primedetaill/',
            'https://wa.me/5534984033956',
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            bestRating: '5',
            ratingCount: '127',
            reviewCount: '89',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Carlos M.' },
              datePublished: '2025-11-15',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'Fiz vitrificação no meu BMW e o resultado ficou impressionante. Equipe extremamente profissional e o acabamento ficou perfeito.',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Fernanda R.' },
              datePublished: '2025-10-22',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'Melhor serviço de polimento que já contratei em Uberlândia. Meu carro parece ter saído da concessionária. Recomendo demais!',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Rafael S.' },
              datePublished: '2025-09-08',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'Apliquei PPF no capô e para-choque. Qualidade impecável, atendimento personalizado e o resultado superou minhas expectativas.',
            },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Serviços de Estética Automotiva',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lavagem Detalhada', description: 'Limpeza minuciosa com pincéis em frestas, remoção de contaminação ferrosa e proteção básica de pintura.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Polimento Técnico', description: 'Remoção de riscos, hologramas e micro-marcas, recuperando brilho de fábrica da pintura automotiva.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vitrificação de Pintura (Ceramic Coating 9H)', description: 'Proteção cerâmica de alta dureza que repele sujeira, raios UV e dejetos por até 3 anos.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PPF – Paint Protection Film', description: 'Película de poliuretano autorregenerativa para proteção definitiva contra pedras e riscos.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Higienização Interna', description: 'Limpeza profunda de bancos, carpetes e teto com extração de ácaros e odores.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Película de Controle Solar', description: 'Redução de calor e proteção UV para conforto térmico e conservação do interior.' } },
            ],
          },
        }}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Veículo com acabamento premium após serviço de estética automotiva na Prime Detail Uberlândia"
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
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 brand-gradient text-white font-condensed uppercase tracking-wider text-sm md:text-base hover:opacity-90 transition-opacity glow-brand"
              >
                Agendar avaliação gratuita <ArrowRight size={16} />
              </a>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white font-condensed uppercase tracking-wider text-sm md:text-base hover:bg-white/10 transition-colors"
              >
                Ver serviços
              </Link>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-3">
              Sem compromisso · Resposta em minutos via WhatsApp
            </p>
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

      {/* Destaque Video Section */}
      <section className="py-24 bg-black overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-5xl font-heading mb-6 tracking-tight text-white uppercase">
                Excelência e <br />
                <span className="text-gradient-brand">Cuidado em cada Detalhe</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 font-body leading-relaxed">
                Nossos serviços são pautados pela precisão e pelo uso das tecnologias mais avançadas do mercado.
                Cada veículo que entra em nossa oficina recebe um tratamento exclusivo, garantindo resultados que superam expectativas.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Técnicas de detalhamento avançado',
                  'Produtos de alta performance',
                  'Proteção duradoura e brilho intenso',
                  'Preservação profunda do valor do veículo'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full brand-gradient" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-condensed uppercase tracking-widest text-sm group"
              >
                Conheça nossos serviços <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative group"
            >
              <div className="absolute -inset-4 brand-gradient opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-700" />

              <div className="relative aspect-[4/5] md:aspect-video rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={cuidadoImage}
                  alt="Cuidado em cada detalhe na Prime Detail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
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
                Do{' '}
                <Link to="/servicos/polimento-tecnico" className="text-primary hover:underline">polimento corretivo</Link>{' '}
                à proteção de última geração com{' '}
                <Link to="/servicos/ppf-protecao-pintura" className="text-primary hover:underline">PPF</Link>{' '}
                e{' '}
                <Link to="/servicos/vitrificacao-pintura" className="text-primary hover:underline">Cerâmico</Link>{' '}
                em Uberlândia.
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

      {/* Video do Processo */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden border border-white/10 shadow-2xl"
          >
            <video
              src={PROCESS_VIDEO}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              poster="/logo_prime.png"
            />
          </motion.div>
        </div>
      </section>

      {/* Por que escolher a Prime Detail */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading mb-6 text-white">
              Por que escolher a <span className="text-gradient-brand">Prime Detail</span> em Uberlândia?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              A Prime Detail é uma empresa de estética automotiva em Uberlândia especializada em{' '}
              <Link to="/servicos/polimento-tecnico" className="text-primary hover:underline">polimento técnico</Link>,{' '}
              <Link to="/servicos/vitrificacao-pintura" className="text-primary hover:underline">vitrificação de pintura</Link>{' '}
              (ceramic coating 9H) e{' '}
              <Link to="/servicos/ppf-protecao-pintura" className="text-primary hover:underline">proteção PPF</Link>{' '}
              para veículos premium. Nosso compromisso é oferecer o mais alto padrão de cuidados automotivos,
              combinando técnicas internacionais com produtos de linha profissional para proteger e valorizar o seu veículo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-secondary/30 border border-border hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg text-white mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
              { val: '+ de 5.000', label: 'Carros Transformados', link: '/resultados' },
              { val: '100%', label: 'Garantia de Qualidade' },
              { val: '4.9/5', label: 'Avaliação Clientes' },
              { val: 'Premium', label: 'Produtos Importados' },
            ].map((stat, i) => (
              <div key={stat.label}>
                {'link' in stat && stat.link ? (
                  <Link to={stat.link} className="hover:opacity-80 transition-opacity">
                    <div className="text-4xl md:text-5xl font-heading mb-2">{stat.val}</div>
                    <div className="text-xs md:text-sm uppercase tracking-widest opacity-80 font-condensed font-bold">{stat.label}</div>
                  </Link>
                ) : (
                  <>
                    <div className="text-4xl md:text-5xl font-heading mb-2">{stat.val}</div>
                    <div className="text-xs md:text-sm uppercase tracking-widest opacity-80 font-condensed font-bold">{stat.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ – Perguntas Frequentes */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-4 text-center font-heading text-3xl md:text-5xl text-white">
              Dúvidas Frequentes sobre{' '}
              <span className="text-gradient-brand">Estética Automotiva</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Tire suas dúvidas sobre vitrificação, PPF, polimento e outros serviços de estética automotiva em Uberlândia.
            </p>
            <div className="space-y-6">
              {homeFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-border bg-card p-6"
                >
                  <h3 className="mb-3 flex items-center gap-2 font-heading text-lg text-primary">
                    <HelpCircle size={18} /> {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marcas de Confiança */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-condensed mb-8">
            Trabalhamos com as melhores marcas do mercado mundial
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {['Ceramic Pro', 'Gyeon', 'Koch Chemie', 'XPEL', 'Meguiar\'s'].map((brand) => (
              <span
                key={brand}
                className="text-lg md:text-xl font-heading text-muted-foreground/50 uppercase tracking-wider"
              >
                {brand}
              </span>
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
              Explicamos qual serviço seu carro realmente precisa. Agende uma avaliação técnica gratuita via WhatsApp.
            </p>
            <div className="pt-4">
              <a
                href="https://wa.me/5534984033956"
                target="_blank"
                rel="noopener noreferrer"
                data-cta="bottom-whatsapp"
                className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 brand-gradient text-white font-heading text-lg md:text-xl uppercase tracking-wider glow-brand animate-float"
              >
                Agendar via WhatsApp
              </a>
              <p className="text-xs text-muted-foreground mt-3">
                Atendimento rápido · Sem compromisso
              </p>
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
