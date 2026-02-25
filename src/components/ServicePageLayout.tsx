import { motion } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';
import { HelpCircle, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { claimPlayback, releasePlayback } from '@/lib/videoRegistry';

interface FaqItem {
    q: string;
    a: string;
}

interface ServicePageLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    heroVideo?: string;
    benefits: string[];
    process: string[];
    faqs: FaqItem[];
    pricing: string;
    gallery?: string[];
}

const ServiceMedia = ({ src, poster }: { src: string; poster: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);
    const mountedRef = useRef(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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
                    if (err.name !== 'AbortError') {
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

    // Safari: explicitly load the video when src changes dynamically
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isLoaded) return;
        video.load();
    }, [isLoaded]);

    useEffect(() => {
        mountedRef.current = true;
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                } else {
                    safePause(video);
                }
            },
            { threshold: 0.15, rootMargin: '200px' }
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
        if (!video) return;
        if (video.paused) {
            safePlay(video);
        } else {
            safePause(video);
        }
    };

    return (
        <div className="h-full w-full relative" onClick={toggle}>
            <video
                ref={videoRef}
                src={isLoaded ? src : undefined}
                poster={poster}
                preload="metadata"
                muted
                loop
                playsInline
                webkit-playsinline="true"
                className="h-full w-full object-cover pointer-events-none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => { setIsPlaying(false); if (videoRef.current) releasePlayback(videoRef.current); }}
                onEnded={() => { setIsPlaying(false); if (videoRef.current) releasePlayback(videoRef.current); }}
            />
            <div
                className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-500 ${isPlaying ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 bg-black/30'}`}
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm transition-transform active:scale-95">
                    <Play className="ml-1 h-6 w-6 text-white" fill="white" />
                </div>
            </div>
        </div>
    );
};

const ServicePageLayout = ({
    title,
    subtitle,
    description,
    heroImage,
    heroVideo,
    benefits,
    process,
    faqs,
    pricing,
    gallery,
}: ServicePageLayoutProps) => {
    return (
        <>
            <SEOHead
                title={`${title} em Uberlândia - Prime Detail`}
                description={subtitle}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map((faq) => ({
                        '@type': 'Question',
                        name: faq.q,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: faq.a,
                        },
                    })),
                }}
            />

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {heroVideo ? (
                        <ServiceMedia src={heroVideo} poster={heroImage} />
                    ) : (
                        <img src={heroImage} alt={`${title} – serviço de estética automotiva Prime Detail Uberlândia`} className="h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="h-1 w-16 brand-gradient mx-auto mb-6" />
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-heading mb-4 text-white uppercase tracking-tighter">
                            {title.split(' ')[0]} <span className="text-gradient-brand">{title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-body">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white uppercase tracking-wider">O que é o <span className="text-primary">Serviço?</span></h2>
                            <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                                <p className="whitespace-pre-line">{description}</p>
                            </div>

                            <div className="mt-12 p-6 md:p-8 bg-card border border-border rounded-lg">
                                <h3 className="text-xl font-heading mb-4 text-white uppercase tracking-widest">{pricing.includes('A partir') ? 'Investimento Estimado' : 'Orçamento'}</h3>
                                <p className="text-3xl font-heading text-primary">{pricing}</p>
                                <p className="text-sm text-muted-foreground mt-2 font-condensed">* Valores variam conforme o tamanho e estado do veículo.</p>
                                <a
                                    href={`https://wa.me/5534984033956?text=Gostaria de um orçamento para ${encodeURIComponent(title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 brand-gradient text-white font-heading text-sm md:text-base uppercase tracking-widest transition-opacity hover:opacity-90 glow-brand"
                                >
                                    Agendar via WhatsApp <ArrowRight size={18} />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div>
                                <h3 className="text-2xl font-heading mb-6 text-white uppercase tracking-widest">Benefícios</h3>
                                <div className="space-y-4">
                                    {benefits.map((benefit, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <CheckCircle2 className="text-primary flex-shrink-0 w-6 h-6" />
                                            <p className="text-muted-foreground">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-heading mb-6 text-white uppercase tracking-widest">Nosso Processo</h3>
                                <div className="space-y-6">
                                    {process.map((step, i) => (
                                        <div key={i} className="flex gap-6 items-center">
                                            <div className="flex-shrink-0 w-10 h-10 brand-gradient rounded-full flex items-center justify-center font-heading text-white">
                                                {i + 1}
                                            </div>
                                            <p className="text-muted-foreground italic">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            {gallery && gallery.length > 0 && (
                <section className="py-20 border-t border-border/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-heading mb-4 text-center text-white">Processo & <span className="text-gradient-brand">Resultados</span></h2>
                        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Acompanhe o passo a passo e os resultados reais do nosso trabalho.</p>
                        <div className={`grid gap-4 ${gallery.length <= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                            {gallery.map((img, i) => (
                                <div key={i} className="aspect-square overflow-hidden border border-border/50 group">
                                    <img src={img} alt={`${title} – foto ${i + 1} do processo de ${title.toLowerCase()} na Prime Detail`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="py-24 bg-card/30 border-t border-border/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="mb-12 text-center font-heading text-3xl text-white md:text-4xl">
                            Dúvidas sobre o <span className="text-gradient-brand">Serviço</span>
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border border-border bg-card p-8">
                                    <h3 className="mb-4 flex items-center gap-3 font-heading text-lg text-primary uppercase tracking-wider">
                                        <HelpCircle size={20} /> {faq.q}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicePageLayout;
