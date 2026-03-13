import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Sparkles, Droplets, PaintBucket, ShieldCheck, Car, HelpCircle, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { claimPlayback, releasePlayback } from '@/lib/videoRegistry';
import { getServiceImages } from '@/lib/getServiceImages';

/** Resolve the MIME type for a video URL based on extension */
function getVideoMimeType(src: string): string {
  const ext = src.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mov': return 'video/quicktime';
    case 'webm': return 'video/webm';
    default: return 'video/mp4';
  }
}

// Each video section manages its own ref, state and IntersectionObserver
const ServiceMedia = ({ src, poster }: { src: string; poster: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const mountedRef = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safe pause: waits for any pending play() promise before calling pause()
  const safePause = (video: HTMLVideoElement) => {
    const pending = playPromiseRef.current;
    if (pending) {
      pending
        .then(() => { if (mountedRef.current && !video.paused) video.pause(); })
        .catch(() => { /* already handled */ });
    } else if (!video.paused) {
      video.pause();
    }
  };

  // Safe play: tracks the pending promise and silences AbortError
  const safePlay = (video: HTMLVideoElement) => {
    // Mutual exclusion: pause any other active video first
    claimPlayback(video, () => safePause(video));

    const attemptPlay = () => {
      const promise = video.play();
      playPromiseRef.current = promise;
      promise
        .then(() => {
          playPromiseRef.current = null;
        })
        .catch((err) => {
          playPromiseRef.current = null;
          releasePlayback(video);
          if (err.name === 'NotSupportedError') {
            setHasError(true);
          } else if (err.name !== 'AbortError') {
            console.error('Playback failed:', err.name, err.message);
          }
        });
    };

    // Safari: if the video hasn't loaded any data, trigger load first
    if (video.readyState === 0) {
      video.addEventListener('canplay', () => {
        if (mountedRef.current) attemptPlay();
      }, { once: true });
      video.load();
    } else {
      attemptPlay();
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Safari: Warming up the media engine early helps prevent AbortError
          if (video.readyState === 0) {
            video.load();
          }
        } else {
          safePause(video);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      mountedRef.current = false;
      observer.disconnect();
      safePause(video);
      releasePlayback(video);
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || hasError) return;

    if (video.paused) {
      safePlay(video);
    } else {
      safePause(video);
    }
  };

  // If the video format is unsupported, fall back to poster image
  if (hasError) {
    return (
      <div className="h-full w-full relative">
        <img src={poster} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  const mimeType = getVideoMimeType(src);

  return (
    <div className="h-full w-full relative group cursor-pointer" onClick={toggle}>
      <video
        ref={videoRef}
        poster={poster}
        preload="metadata"
        loop
        playsInline
        webkit-playsinline="true"
        className="h-full w-full object-cover pointer-events-none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => { setIsPlaying(false); if (videoRef.current) releasePlayback(videoRef.current); }}
        onEnded={() => { setIsPlaying(false); if (videoRef.current) releasePlayback(videoRef.current); }}
        onError={() => setHasError(true)}
      >
        <source src={src} type={mimeType} />
      </video>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${isPlaying ? 'opacity-0 scale-110' : 'opacity-100 bg-black/40'
          }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition-transform group-hover:scale-110 active:scale-95">
          <Play className="ml-1 h-8 w-8 text-white" fill="white" />
        </div>
      </div>
    </div>
  );
};

// Imagens auto-descobertas por pasta (sem imports manuais)
const lavada = getServiceImages('lavada-detalhada');
const polimento = getServiceImages('polimento');
const vitrificacao = getServiceImages('vitrificacao');
const ppf = getServiceImages('ppf');
const higienizacao = getServiceImages('higienizacao');
const pelicula = getServiceImages('pelicula-protecao-solar');

const services = [
  {
    icon: Droplets,
    title: 'Lavagem Detalhada',
    description: 'Limpeza minuciosa com pincéis em frestas, remoção de contaminação ferrosa e proteção básica de pintura.',
    price: 'A partir de R$ 150',
    heroImage: lavada.hero,
    heroVideo: '/videos/lavada-hero.mp4',
    gallery: lavada.gallery,
    slug: 'lavagem-detalhada',
  },
  {
    icon: Sparkles,
    title: 'Polimento Técnico',
    description: 'Remoção de riscos e hologramas, recuperando o brilho original. Essencial antes da vitrificação.',
    price: 'A partir de R$ 500',
    heroImage: polimento.hero,
    heroVideo: '/videos/polimento-site.mp4',
    gallery: polimento.gallery,
    slug: 'polimento-tecnico',
  },
  {
    icon: ShieldCheck,
    title: 'Vitrificação de Pintura',
    description: 'Proteção cerâmica de alta dureza (9H). Repele sujeira, raios UV e dejetos de pássaros por até 3 anos.',
    price: 'A partir de R$ 1.200',
    heroImage: vitrificacao.hero,
    heroVideo: '/videos/vitrificacao-hero.mp4',
    gallery: vitrificacao.gallery,
    slug: 'vitrificacao-pintura',
  },
  {
    icon: Droplets,
    title: 'Película de Controle Solar',
    description: 'Redução de calor e proteção UV extrema. Melhora o conforto térmico e protege o interior contra desbotamento.',
    price: 'A partir de R$ 400',
    heroImage: pelicula.hero,
    heroVideo: undefined,
    gallery: pelicula.gallery,
    slug: 'pelicula-controle-solar',
  },
  {
    icon: PaintBucket,
    title: 'PPF (Paint Protection Film)',
    description: 'Película de poliuretano regenerativa. A proteção definitiva contra pedras de estrada e riscos profundos.',
    price: 'Sob consulta',
    heroImage: ppf.hero,
    heroVideo: '/videos/ppf-hero.mp4',
    gallery: ppf.gallery,
    slug: 'ppf-protecao-pintura',
  },
  {
    icon: Car,
    title: 'Higienização Interna',
    description: 'Limpeza profunda de bancos, carpetes e teto. Extração de ácaros e odores com proteção de plásticos/couro.',
    price: 'A partir de R$ 350',
    heroImage: higienizacao.hero,
    heroVideo: '/videos/higienizacao-hero.mp4',
    gallery: higienizacao.gallery,
    slug: 'higienizacao-interna',
  },
];

const faqs = [
  {
    q: 'Quanto tempo demora o serviço?',
    a: 'Depende do serviço. Uma lavagem detalhada leva em média 4 a 6 horas. Vitrificação e Polimento podem exigir de 2 a 3 dias úteis.',
  },
  {
    q: 'Preciso agendar com antecedência?',
    a: 'Sim, trabalhamos com agendamento prévio para garantir a atenção dedicada que seu veículo merece. Recomendamos 3-5 dias de antecedência.',
  },
  {
    q: 'Vocês dão garantia?',
    a: 'Sim! Todos os nossos serviços de proteção (Vitrificação e PPF) acompanham certificado de garantia e guia de manutenção.',
  },
];

const Servicos = () => {
  return (
    <>
      <SEOHead
        title="Serviços de Estética Automotiva Premium em Uberlândia"
        description="Serviços de estética automotiva premium em Uberlândia: polimento técnico, vitrificação cerâmica 9H, PPF, higienização interna e lavagem detalhada. Solicite seu orçamento via WhatsApp."
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

      {/* Page Header */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="h-1 w-16 brand-gradient mb-6" />
            <h1 className="text-4xl md:text-6xl font-heading mb-4 text-white">
              Nossos <span className="text-gradient-brand">Serviços</span>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Soluções avançadas para proteger, renovar e valorizar seu patrimônio em Uberlândia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => {
        const isReversed = i % 2 !== 0;
        return (
          <section key={service.title} className="border-t border-border/30 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${isReversed ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
                  }`}
              >
                {/* Media Block */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative aspect-[3/4] overflow-hidden bg-black rounded-sm"
                >
                  {service.heroVideo ? (
                    <ServiceMedia src={service.heroVideo} poster={service.heroImage} />
                  ) : (
                    <img
                      src={service.heroImage}
                      alt={`${service.title} – serviço de estética automotiva Prime Detail Uberlândia`}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>

                {/* Text Block */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="py-4 md:py-0"
                >
                  <div className="h-0.5 w-10 brand-gradient mb-6" />
                  <service.icon className="mb-4 h-10 w-10 text-primary" />
                  <h2 className="mb-4 font-heading text-3xl text-white md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mb-8 font-condensed text-sm font-bold uppercase tracking-wider text-accent">
                    {service.price}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/5534984033956?text=Gostaria de saber mais sobre ${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 brand-gradient px-6 py-3 font-condensed text-sm uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                    >
                      Consultar Orçamento <ArrowRight size={14} />
                    </a>

                    <Link
                      to={`/servicos/${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3 font-condensed text-sm uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                    >
                      Ver Detalhes <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-12 text-center font-heading text-3xl text-white md:text-4xl">
              Perguntas <span className="text-gradient-brand">Frequentes</span>
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border bg-card p-6">
                  <h3 className="mb-3 flex items-center gap-2 font-heading text-lg text-primary">
                    <HelpCircle size={18} /> {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicos;
