import { motion } from 'framer-motion';
import { HelpCircle, Droplets, Sparkles, ShieldCheck, Clock, Calendar, CheckSquare, MessageCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const faqCategories = [
    {
        title: 'Geral',
        icon: HelpCircle,
        questions: [
            {
                q: 'Onde a Prime Detail está localizada?',
                a: 'Estamos localizados em Uberlândia, MG. Atendemos sob agendamento prévio para garantir a máxima qualidade em cada serviço.',
            },
            {
                q: 'Como posso agendar um serviço?',
                a: 'O agendamento pode ser feito diretamente pelo nosso WhatsApp (34) 98403-3956 ou clicando nos botões de contato em nosso site.',
            },
            {
                q: 'Quais formas de pagamento vocês aceitam?',
                a: 'Aceitamos PIX, cartões de crédito e débito. Parcelamos serviços de maior valor conforme a necessidade do cliente.',
            },
        ],
    },
    {
        title: 'Lavagem & Limpeza',
        icon: Droplets,
        questions: [
            {
                q: 'Qual a diferença entre a Lavagem Detalhada e uma lavagem comum?',
                a: 'A lavagem comum (de posto ou lava-jatos rápidos) costuma usar produtos agressivos e panos sujos que riscam a pintura. Nossa Lavagem Detalhada é técnica, utiliza produtos de pH neutro, pincéis para frestas e métodos que preservam a integridade do verniz.',
            },
            {
                q: 'Vocês realizam a limpeza do motor?',
                a: 'Sim, realizamos a limpeza técnica de motor como um serviço adicional. Utilizamos produtos específicos e técnicas que não danificam os componentes eletrônicos.',
            },
            {
                q: 'Quanto tempo demora uma Lavagem Detalhada?',
                a: 'Em média, o processo leva de 4 a 6 horas, dependendo do porte e do estado de conservação do veículo.',
            },
        ],
    },
    {
        title: 'Proteção & Estética',
        icon: ShieldCheck,
        questions: [
            {
                q: 'O que é Vitrificação de Pintura?',
                a: 'É a aplicação de uma camada de proteção cerâmica (9H) sobre o verniz. Ela cria uma barreira extremamente resistente contra raios UV, dejetos de pássaros, seiva de árvores e pequenos riscos, além de facilitar muito a limpeza.',
            },
            {
                q: 'O que é PPF e por que ele é a melhor proteção?',
                a: 'PPF (Paint Protection Film) é uma película de poliuretano transparente e regenerativa. É a proteção mais robusta do mercado contra pedradas de estrada, riscos profundos e vandalismo.',
            },
            {
                q: 'Preciso polir o carro antes de vitrificar?',
                a: 'Sim. A vitrificação exige que a superfície esteja impecável. O Polimento Técnico remove imperfeições e garante a melhor ancoragem e brilho para o vitrificador.',
            },
        ],
    },
    {
        title: 'Manutenção & Cuidados',
        icon: CheckSquare,
        questions: [
            {
                q: 'Como devo lavar meu carro após a vitrificação?',
                a: 'Recomendamos o uso de shampoos neutros e luvas de microfibra limpas. Evite produtos ácidos ou alcalinos fortes e nunca use escovas ou panos de chão.',
            },
            {
                q: 'Vocês dão garantia nos serviços?',
                a: 'Sim! Serviços de proteção como Vitrificação e PPF acompanham certificado de garantia e um guia de cuidados para que você mantenha o resultado por muito mais tempo.',
            },
            {
                q: 'Com que frequência devo realizar a higienização interna?',
                a: 'Para uso diário, recomendamos uma higienização profunda a cada 6 meses para evitar acúmulo de ácaros e bactérias, mantendo o ambiente saudável.',
            },
        ],
    },
];

const FAQ = () => {
    return (
        <>
            <SEOHead
                title="Dúvidas Frequentes | Prime Detail Uberlândia"
                description="Tire suas dúvidas sobre vitrificação, polimento técnico, lavagem detalhada e outros serviços de estética automotiva premium na Prime Detail Uberlândia."
            />

            {/* Hero Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="h-1 w-16 brand-gradient mb-6" />
                        <h1 className="text-4xl md:text-6xl font-heading mb-4 text-white">
                            Dúvidas <span className="text-gradient-brand">Frequentes</span>
                        </h1>
                        <p className="text-muted-foreground max-w-lg">
                            Tudo o que você precisa saber sobre nossos processos, cuidados e como valorizar seu veículo.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar Navigation (Desktop) */}
                        <aside className="hidden lg:block space-y-2 sticky top-24 h-fit">
                            {faqCategories.map((category) => (
                                <a
                                    key={category.title}
                                    href={`#${category.title.toLowerCase().replace(/\s/g, '-')}`}
                                    className="flex items-center gap-3 p-3 text-muted-foreground hover:text-primary hover:bg-white/5 transition-all group"
                                >
                                    <category.icon size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-condensed text-sm uppercase tracking-wider">{category.title}</span>
                                </a>
                            ))}
                        </aside>

                        {/* Questions Content */}
                        <div className="lg:col-span-3 space-y-16">
                            {faqCategories.map((category) => (
                                <div key={category.title} id={category.title.toLowerCase().replace(/\s/g, '-')} className="scroll-mt-24">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-sm bg-primary/10 text-primary">
                                            <category.icon size={24} />
                                        </div>
                                        <h2 className="font-heading text-2xl md:text-3xl text-white">
                                            {category.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        {category.questions.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className="bg-card border border-border/50 p-6 md:p-8 hover:border-primary/50 transition-colors group"
                                            >
                                                <h3 className="text-lg md:text-xl font-heading text-white mb-4 group-hover:text-primary transition-colors">
                                                    {item.q}
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                                    {item.a}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-heading text-white mb-6">Ainda tem alguma dúvida?</h2>
                        <p className="text-muted-foreground mb-10">
                            Nossa equipe está pronta para te ajudar a escolher o melhor tratamento para o seu veículo.
                        </p>
                        <a
                            href="https://wa.me/5534984033956?text=Olá! Tenho uma dúvida sobre os serviços."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 brand-gradient text-white font-condensed text-lg uppercase tracking-wider transition-transform hover:scale-105"
                        >
                            <MessageCircle size={20} /> Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQ;
