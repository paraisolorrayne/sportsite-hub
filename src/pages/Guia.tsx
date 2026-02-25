import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Download, ShieldAlert, Smartphone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { trackCTA } from '@/lib/analytics';

const Guia = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Validação robusta de telefone
    const validatePhone = (val: string) => {
        // Remove tudo que não é dígito
        const digits = val.replace(/\D/g, '');

        // Regras de validação
        if (digits.length < 10 || digits.length > 11) return 'Telefone inválido (faltam dígitos)';

        // Blacklist de padrões sequenciais ou óbvios
        const blacklist = [
            '00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
            '55555555555', '66666666666', '77777777777', '88888888888', '99999999999',
            '12345678900', '11998989898', '11900000000', '34900000000'
        ];

        if (blacklist.some(b => digits.includes(b))) return 'Número inválido (padrão bloqueado)';

        // Verifica dígitos iguais repetidos (ex: 9999999)
        if (/(\d)\1{7,}/.test(digits)) return 'Número inválido (dígitos repetidos)';

        return null;
    };

    const formatPhone = (val: string) => {
        const x = val.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        if (!x) return val;
        return !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
    };

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validatePhone(phone);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        setSuccess(true);
        trackCTA('download-ebook');

        // Simulação de download após 1.5s
        setTimeout(() => {
            // Em produção, isso seria um link real para um PDF em /public ou S3
            alert('Obrigado! O download do seu E-book "Guia de Manutenção Prime Detail" iniciará agora.');
            // window.open('/ebook-manutencao.pdf', '_blank'); 
        }, 1500);
    };

    return (
        <>
            <SEOHead
                title="Guia: Como Cuidar do Seu Carro – Prime Detail"
                description="Baixe grátis o guia de manutenção automotiva da Prime Detail Uberlândia. Aprenda a cuidar da vitrificação, PPF e pintura do seu carro. E-book exclusivo com dicas profissionais."
            />

            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="h-1 w-16 brand-gradient mb-6" />
                            <h1 className="text-4xl md:text-6xl font-heading mb-6 text-white leading-tight">
                                Mantenha seu carro como <span className="text-gradient-brand">novo por anos</span>
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8 text-balance">
                                Você investiu na estética do seu veículo. Agora, aprenda as técnicas corretas de lavagem, manutenção de couro e regeneração de PPF com nosso guia técnico.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    'A técnica dos dois baldes para evitar riscos',
                                    'Produtos que você NUNCA deve usar na limpeza',
                                    'Como prolongar a vida da vitrificação',
                                    'Checklist de manutenção mensal',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card p-6 md:p-10 border border-border relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-primary opacity-5">
                                <BookOpen size={120} />
                            </div>

                            {success ? (
                                <div className="text-center py-10 space-y-6">
                                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Download size={32} />
                                    </div>
                                    <h3 className="text-2xl font-heading text-white uppercase">Download Liberado!</h3>
                                    <p className="text-muted-foreground">O guia está sendo enviado para seu navegador e uma cópia também será enviada para seu WhatsApp em breve.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleDownload} className="space-y-6 relative z-10">
                                    <h3 className="text-2xl font-heading text-white uppercase mb-2">Baixar E-book Grátis</h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Informe seu WhatsApp para receber o link de download direto do PDF (Gratuito).
                                    </p>

                                    <div>
                                        <label className="text-xs font-condensed uppercase tracking-widest text-muted-foreground mb-2 font-bold flex items-center gap-2">
                                            <Smartphone size={14} className="text-primary" /> Seu WhatsApp com DDD
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="(34) 98403-3956"
                                            value={phone}
                                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                                            className={`w-full px-4 py-4 bg-secondary border ${error ? 'border-destructive' : 'border-border'} text-white focus:border-primary focus:outline-none transition-all text-xl rounded-sm`}
                                            required
                                        />
                                        {error && (
                                            <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                                                <ShieldAlert size={12} /> {error}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        data-cta="request-ebook"
                                        className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 brand-gradient text-white font-heading text-base md:text-lg uppercase tracking-wider hover:opacity-90 transition-opacity glow-brand shadow-lg"
                                    >
                                        Quero Garantir Meu Guia <Download size={20} />
                                    </button>
                                    <p className="text-[10px] text-muted-foreground text-center opacity-60">
                                        Ao prosseguir, você concorda com nossa política de privacidade. O download iniciará automaticamente.
                                    </p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Guide Topics Highlights */}
            <section className="py-24 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-heading text-white text-center mb-4">
                        O que você vai <span className="text-gradient-brand">aprender</span>
                    </h2>
                    <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
                        Nosso guia foi escrito pela equipe técnica da Prime Detail Uberlândia com base em anos de experiência no cuidado de veículos premium.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-xl font-heading text-white">Lavagem Segura: Método dos Dois Baldes</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A técnica dos dois baldes é a base de qualquer lavagem profissional. Um balde contém água com shampoo neutro automotivo e o outro apenas água limpa para enxaguar a luva de microfibra entre as passadas. Isso evita que partículas de sujeira sejam arrastadas de volta à pintura, prevenindo os famosos swirl marks (micro-riscos circulares). No guia, ensinamos o passo a passo completo, incluindo a pré-lavagem com snow foam e a secagem segura com toalha de waffle.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-heading text-white">Proteção Solar e Cuidados com o Calor</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                O clima de Uberlândia, com temperaturas que ultrapassam 35°C no verão, é especialmente agressivo para pinturas e interiores automotivos. No guia, explicamos como manter borrachas e plásticos condicionados para evitar ressecamento, a importância de estacionar na sombra ou usar capa protetora, e como a vitrificação cerâmica atua como barreira contra raios UV. Também abordamos como ativar a propriedade self-healing do PPF usando apenas calor solar.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-heading text-white">Conservação de Couro e Interior</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Bancos de couro precisam de hidratação periódica para não ressecar, trincar e perder a flexibilidade. No guia, ensinamos a frequência ideal de hidratação (a cada 3 meses), quais produtos usar e quais evitar (nunca use produtos à base de silicone em couro), e como limpar manchas sem danificar o material. Também cobrimos o cuidado com Alcantara, camurça sintética e plásticos de acabamento piano black.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Tips Section for LLMO */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-heading text-white text-center mb-12">
                        Dicas rápidas de <span className="text-gradient-brand">manutenção automotiva</span>
                    </h2>
                    <div className="space-y-8">
                        <div className="p-6 bg-card border border-border">
                            <h3 className="font-heading text-lg text-primary mb-3">Qual a frequência ideal de lavagem?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Para veículos com vitrificação cerâmica, recomendamos lavagem a cada 7 a 14 dias, usando shampoo neutro com pH balanceado. Evite lava-rápidos com escova rotativa — eles são a principal causa de swirl marks. Se o carro tiver PPF, a lavagem pode seguir o mesmo intervalo, mas nunca use produtos à base de solvente ou removedores de cera agressivos, que podem comprometer a camada de proteção.
                            </p>
                        </div>
                        <div className="p-6 bg-card border border-border">
                            <h3 className="font-heading text-lg text-primary mb-3">Posso encerar um carro vitrificado?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Não é necessário, pois a vitrificação cerâmica já oferece proteção superior à cera. Porém, você pode aplicar um booster de cerâmica (manutenção) a cada 4 a 6 meses para reforçar a hidrofobicidade e manter o brilho. Na Prime Detail, oferecemos esse serviço de manutenção preventiva para clientes que fizeram vitrificação conosco.
                            </p>
                        </div>
                        <div className="p-6 bg-card border border-border">
                            <h3 className="font-heading text-lg text-primary mb-3">Como remover dejetos de pássaros sem riscar?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Dejetos de pássaros são altamente ácidos e podem danificar o verniz se não forem removidos rapidamente. Nunca esfregue a seco — umedeça a área com água e um pano de microfibra, deixe amolecer por 30 segundos e remova com movimentos suaves. Se o carro tiver vitrificação, a camada cerâmica oferece proteção adicional contra ataques ácidos, mas mesmo assim a remoção rápida é recomendada.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Guia;
