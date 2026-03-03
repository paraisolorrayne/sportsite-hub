import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Sparkles } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { getServiceImages } from '@/lib/getServiceImages';

/* ─── Dados de todos os antes/depois organizados por serviço ─── */
const lavagem = getServiceImages('lavada-detalhada');
const polimento = getServiceImages('polimento');
const higienizacao = getServiceImages('higienizacao');

interface BeforeAfterEntry {
    before: string;
    after: string;
    service: string;
    label: string;
    serviceColor: string;
}

const allBeforeAfter: BeforeAfterEntry[] = [
    // Lavagem Detalhada
    {
        before: lavagem.all[14],   // Fiat Toro suja
        after: lavagem.all[15],    // Fiat Toro limpa
        service: 'Lavagem Detalhada',
        label: 'Fiat Toro — Exterior Completo',
        serviceColor: 'from-blue-500 to-cyan-400',
    },
    {
        before: lavagem.all[0],    // VW Amarok motor sujo
        after: lavagem.all[1],     // VW Amarok motor limpo
        service: 'Lavagem Detalhada',
        label: 'VW Amarok — Motor',
        serviceColor: 'from-blue-500 to-cyan-400',
    },
    {
        before: lavagem.all[12],   // Chevrolet S10 motor sujo
        after: lavagem.all[13],    // Chevrolet S10 motor limpo
        service: 'Lavagem Detalhada',
        label: 'Chevrolet S10 — Motor',
        serviceColor: 'from-blue-500 to-cyan-400',
    },
    // Higienização Interna
    {
        before: higienizacao.all[1],  // Banco caramelo sujo
        after: higienizacao.all[3],   // Banco branco limpo
        service: 'Higienização Interna',
        label: 'Banco de Couro',
        serviceColor: 'from-emerald-500 to-teal-400',
    },
];

/* ─── Lightbox ─── */
const ImageLightbox = ({ src, label, onClose }: { src: string; label: string; onClose: () => void }) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    aria-label="Fechar"
                >
                    <X className="w-6 h-6" />
                </button>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={src}
                        alt={label}
                        className="max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl"
                    />
                    <p className="mt-3 text-white/70 text-sm font-condensed uppercase tracking-wider">
                        {label}
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Before/After Slider Individual ─── */
const BeforeAfterSlider = ({ entry }: { entry: BeforeAfterEntry }) => {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((x / rect.width) * 100);
    }, []);

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
    }, [handleMove]);

    return (
        <>
            <div
                ref={containerRef}
                className="relative aspect-[3/2] w-full overflow-hidden rounded-sm cursor-col-resize select-none border border-border/50"
                onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
                onTouchStart={(e) => { isDragging.current = true; handleMove(e.touches[0].clientX); }}
            >
                {/* After (fundo) */}
                <img src={entry.after} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
                {/* Before (clip) */}
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
                    <img src={entry.before} alt="Antes" className="w-full h-full object-cover" />
                </div>
                {/* Divider */}
                <div className="absolute top-0 bottom-0 z-10" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
                    <div className="h-full w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <ChevronLeft className="w-4 h-4 text-black -mr-1" />
                        <ChevronRight className="w-4 h-4 text-black -ml-1" />
                    </div>
                </div>
                {/* Labels */}
                <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-condensed uppercase tracking-widest rounded-sm">
                    Antes
                </div>
                <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-condensed uppercase tracking-widest rounded-sm">
                    Depois
                </div>
                {/* Zoom buttons */}
                <button
                    onClick={(e) => { e.stopPropagation(); setLightbox({ src: entry.before, label: `${entry.label} — Antes` }); }}
                    className="absolute bottom-3 left-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Ampliar antes"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); setLightbox({ src: entry.after, label: `${entry.label} — Depois` }); }}
                    className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-primary/70 hover:bg-primary/90 text-white transition-colors"
                    aria-label="Ampliar depois"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
            </div>

            {lightbox && (
                <ImageLightbox
                    src={lightbox.src}
                    label={lightbox.label}
                    onClose={() => setLightbox(null)}
                />
            )}
        </>
    );
};

/* ─── Simple Side-by-Side Before/After Display ─── */
const SimpleBeforeAfterDisplay = ({ entry, onImageClick }: { entry: BeforeAfterEntry; onImageClick: (src: string, label: string) => void }) => {
    return (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
            {/* Before */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => onImageClick(entry.before, `${entry.label} — Antes`)}
            >
                <img
                    src={entry.before}
                    alt="Antes"
                    className="w-full h-auto rounded-sm border border-border/50 group-hover:border-muted-foreground/50 transition-all"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-condensed uppercase tracking-widest rounded-sm">
                    Antes
                </div>
            </motion.div>

            {/* After */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group cursor-pointer"
                onClick={() => onImageClick(entry.after, `${entry.label} — Depois`)}
            >
                <img
                    src={entry.after}
                    alt="Depois"
                    className="w-full h-auto rounded-sm border border-primary/50 group-hover:border-primary transition-all"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-condensed uppercase tracking-widest rounded-sm">
                    Depois
                </div>
            </motion.div>
        </div>
    );
};

/* ─── Filter Tabs ─── */
const serviceFilters = [
    { label: 'Todos', value: 'all' },
    { label: 'Lavagem Detalhada', value: 'Lavagem Detalhada' },
    { label: 'Polimento Técnico', value: 'Polimento Técnico' },
    { label: 'Higienização Interna', value: 'Higienização Interna' },
];

/* ─── Main Component ─── */
const Resultados = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

    const filteredEntries = activeFilter === 'all'
        ? allBeforeAfter
        : allBeforeAfter.filter((e) => e.service === activeFilter);

    const couroEntry = allBeforeAfter.find(e => e.label === 'Banco de Couro');

    return (
        <>
            <SEOHead
                title="Resultados e Antes/Depois de Estética Automotiva"
                description="Galeria de antes e depois da Prime Detail Uberlândia. Resultados reais de polimento técnico, vitrificação cerâmica e PPF em veículos premium. Confira as transformações."
            />

            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 text-center max-w-2xl mx-auto"
                    >
                        <div className="h-1 w-16 brand-gradient mb-6 mx-auto" />
                        <h1 className="text-4xl md:text-6xl font-heading mb-4 text-white">
                            Processo & <span className="text-gradient-brand">Resultados</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Acompanhe o passo a passo e os resultados reais do nosso trabalho.
                            Transformações que falam por si próprias.
                        </p>
                    </motion.div>

                    {/* Banco de Couro Featured Section */}
                    {couroEntry && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-20 p-8 md:p-12 rounded-sm border border-border/50 bg-gradient-to-br from-emerald-950/30 via-background to-background backdrop-blur-sm overflow-hidden relative"
                        >
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${couroEntry.serviceColor} flex items-center justify-center`}>
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-condensed uppercase tracking-[0.2em] text-emerald-400">
                                            {couroEntry.service}
                                        </p>
                                        <h2 className="text-3xl md:text-4xl font-heading text-white">
                                            {couroEntry.label}
                                        </h2>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-8 max-w-2xl">
                                    As imagens falam por si. Veja como nossa técnica de higienização interna transforma o couro, removendo toda sujidade acumulada e deixando o interior do seu veículo como novo.
                                </p>

                                <SimpleBeforeAfterDisplay
                                    entry={couroEntry}
                                    onImageClick={(src, label) => setLightbox({ src, label })}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* All Transformations Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading text-white mb-3">
                            Todas as <span className="text-gradient-brand">Transformações</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Explore nossa galeria completa com sliders interativos comparando cada detalhe dos serviços.
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-wrap justify-center gap-3 mb-14"
                    >
                        {serviceFilters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-5 py-2.5 font-condensed text-sm uppercase tracking-widest transition-all duration-300 border rounded-sm ${activeFilter === filter.value
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                                        : 'bg-transparent text-muted-foreground border-border/50 hover:border-primary/50 hover:text-white'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Grid de Comparações */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {filteredEntries.map((entry, i) => (
                                <motion.div
                                    key={`${entry.service}-${entry.label}`}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    layout
                                >
                                    {/* Card header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${entry.serviceColor} flex items-center justify-center`}>
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-condensed uppercase tracking-[0.2em] text-primary">
                                                {entry.service}
                                            </p>
                                            <h3 className="text-white font-heading text-lg leading-tight">
                                                {entry.label}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Slider */}
                                    <BeforeAfterSlider entry={entry} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty state */}
                    {filteredEntries.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground italic">
                                Nenhum resultado encontrado para este filtro.
                            </p>
                        </div>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-20 max-w-xl mx-auto"
                    >
                        <div className="border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12 rounded-sm">
                            <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
                                Quer seu veículo <span className="text-gradient-brand">assim?</span>
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Agende agora e veja a diferença com seus próprios olhos. Atendimento exclusivo e personalizado.
                            </p>
                            <a
                                href="https://wa.me/5534992537704?text=Olá! Vi os resultados no site e gostaria de agendar um serviço."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 brand-gradient text-white font-condensed uppercase tracking-widest hover:opacity-90 transition-opacity glow-brand text-base"
                            >
                                Agendar meu serviço
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {lightbox && (
                <ImageLightbox
                    src={lightbox.src}
                    label={lightbox.label}
                    onClose={() => setLightbox(null)}
                />
            )}
        </>
    );
};

export default Resultados;
