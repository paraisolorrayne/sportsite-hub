import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState, useCallback } from 'react';
import { HelpCircle, ArrowRight, Play, CheckCircle2, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { claimPlayback, releasePlayback } from '@/lib/videoRegistry';

interface FaqItem {
    q: string;
    a: string;
}

export interface GalleryGroup {
    /** Título do grupo (ex: "Aplicação do Capô") */
    title: string;
    /** Tipo de visualização */
    type: 'process' | 'before-after';
    /** Imagens do grupo (em ordem) */
    images: string[];
    /** Labels opcionais para cada imagem (ex: ["Antes", "Depois"]) */
    labels?: string[];
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
    /** Galeria agrupada – se fornecido, substitui gallery */
    galleryGroups?: GalleryGroup[];
}

/** Resolve the MIME type for a video URL based on extension */
function getVideoMimeType(src: string): string {
    const ext = src.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'mov': return 'video/quicktime';
        case 'webm': return 'video/webm';
        default: return 'video/mp4';
    }
}

const ServiceMedia = ({ src, poster }: { src: string; poster: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);
    const mountedRef = useRef(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
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
                        // Format not supported – show poster fallback
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
        <div className="h-full w-full relative" onClick={toggle}>
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
                {isLoaded && <source src={src} type={mimeType} />}
            </video>
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

/* ─── Image Lightbox (Zoom Modal) ─── */
const ImageLightbox = ({ images, initialIndex, onClose }: { images: { src: string; label?: string }[]; initialIndex: number; onClose: () => void }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goNext = useCallback(() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1)), [images.length]);
    const goPrev = useCallback(() => setCurrentIndex((prev) => Math.max(prev - 1, 0)), []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose, goNext, goPrev]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    aria-label="Fechar"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Counter */}
                {images.length > 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-condensed tracking-wider">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}

                {/* Previous */}
                {currentIndex > 0 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Next */}
                {currentIndex < images.length - 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}

                {/* Image */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].label || `Imagem ${currentIndex + 1}`}
                        className="max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl"
                    />
                    {images[currentIndex].label && (
                        <p className="mt-3 text-white/70 text-sm font-condensed uppercase tracking-wider">
                            {images[currentIndex].label}
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Before / After Slider ─── */
const BeforeAfterSlider = ({ images, labels }: { images: string[]; labels?: string[] }) => {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((x / rect.width) * 100);
    };

    useEffect(() => {
        const onUp = () => { isDragging.current = false; };
        const onMove = (e: MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
        const onTouchMove = (e: TouchEvent) => { if (isDragging.current) handleMove(e.touches[0].clientX); };
        window.addEventListener('mouseup', onUp);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchend', onUp);
        window.addEventListener('touchmove', onTouchMove);
        return () => {
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchend', onUp);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, []);

    if (images.length < 2) return null;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div
                ref={containerRef}
                className="relative aspect-[3/2] w-full overflow-hidden rounded-sm cursor-col-resize select-none border border-border/50"
                onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
                onTouchStart={(e) => { isDragging.current = true; handleMove(e.touches[0].clientX); }}
            >
                {/* After (fundo) */}
                <img src={images[1]} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
                {/* Before (clip) */}
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
                    <img src={images[0]} alt="Antes" className="w-full h-full object-cover" />
                </div>
                {/* Linha divisória */}
                <div className="absolute top-0 bottom-0 z-10" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
                    <div className="h-full w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <ChevronLeft className="w-4 h-4 text-black -mr-1" />
                        <ChevronRight className="w-4 h-4 text-black -ml-1" />
                    </div>
                </div>
                {/* Labels */}
                <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-condensed uppercase tracking-widest rounded-sm">
                    {labels?.[0] ?? 'Antes'}
                </div>
                <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-condensed uppercase tracking-widest rounded-sm">
                    {labels?.[1] ?? 'Depois'}
                </div>
                {/* Zoom buttons */}
                <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
                    className="absolute bottom-3 left-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Ampliar antes"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(1); }}
                    className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-primary/70 hover:bg-primary/90 text-white transition-colors"
                    aria-label="Ampliar depois"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={[
                        { src: images[0], label: labels?.[0] ?? 'Antes' },
                        { src: images[1], label: labels?.[1] ?? 'Depois' },
                    ]}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </>
    );
};

/* ─── Process Gallery (numbered steps with connector) ─── */
const ProcessGallery = ({ images, labels }: { images: string[]; labels?: string[] }) => {
    const defaultLabels = images.map((_, i) =>
        i === images.length - 1 ? 'Resultado' : `Etapa ${i + 1}`
    );
    const stepLabels = labels ?? defaultLabels;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="relative">
                <div className={`grid gap-5 relative z-10 ${images.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
                    images.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}>
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="group relative cursor-pointer"
                            onClick={() => openLightbox(i)}
                        >
                            <div className="relative aspect-[3/2] overflow-hidden border border-border/50 rounded-sm">
                                <img
                                    src={img}
                                    alt={stepLabels[i]}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                {/* Zoom hint on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                                </div>
                                {/* Label */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-condensed text-sm uppercase tracking-widest">
                                        {stepLabels[i]}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={images.map((img, i) => ({ src: img, label: stepLabels[i] }))}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </>
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
    galleryGroups,
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
                    <img src={heroImage} alt={`${title} – serviço de estética automotiva Prime Detail Uberlândia`} className="h-full w-full object-cover" />
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

                            {heroVideo && (
                                <div className="mt-8 aspect-video rounded-lg overflow-hidden border border-border shadow-2xl relative">
                                    <ServiceMedia src={heroVideo} poster={heroImage} />
                                </div>
                            )}

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

            {/* Gallery – grouped ou flat */}
            {(galleryGroups && galleryGroups.length > 0) ? (
                <section className="py-20 border-t border-border/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-heading mb-4 text-center text-white">Processo & <span className="text-gradient-brand">Resultados</span></h2>
                        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Acompanhe o passo a passo e os resultados reais do nosso trabalho.</p>

                        <div className="space-y-16">
                            {galleryGroups.map((group, gi) => (
                                <motion.div
                                    key={gi}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-px flex-1 bg-border/40" />
                                        <h3 className="font-condensed text-sm uppercase tracking-[0.2em] text-primary whitespace-nowrap">
                                            {group.title}
                                        </h3>
                                        <div className="h-px flex-1 bg-border/40" />
                                    </div>

                                    {group.type === 'before-after' ? (
                                        <div className="max-w-4xl mx-auto">
                                            <BeforeAfterSlider images={group.images} labels={group.labels} />
                                        </div>
                                    ) : (
                                        <ProcessGallery images={group.images} labels={group.labels} />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : gallery && gallery.length > 0 ? (
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
            ) : null}

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
