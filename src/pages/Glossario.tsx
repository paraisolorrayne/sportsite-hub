import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

const terms = [
    {
        term: 'Vitrificação (Ceramic Coating)',
        definition: 'Processo de aplicação de uma camada de sílica vítrea (vidro líquido) sobre a pintura do carro, criando uma proteção de alta dureza (geralmente 9H) que repele água, sujeira e protege contra raios UV e oxidação por anos.'
    },
    {
        term: 'PPF (Paint Protection Film)',
        definition: 'Película termoplástica transparente de poliuretano aplicada sobre superfícies pintadas. É a proteção definitiva contra impactos de pedras, riscos profundos e possui propriedades auto-regenerativas (self-healing).'
    },
    {
        term: 'Polimento Técnico',
        definition: 'Procedimento minucioso de correção de pintura que utiliza diferentes níveis de abrasão para remover riscos, hologramas e manchas, devolvendo o brilho e a profundidade original à cor do veículo.'
    },
    {
        term: 'Descontaminação Ferrosa',
        definition: 'Processo químico que remove partículas de ferro incrustadas na pintura e rodas (geralmente provenientes de pastilhas de freio ou poluição industrial) que não saem em lavagens comuns.'
    },
    {
        term: 'Detailing (Detalhamento)',
        definition: 'Cuidado exaustivo e minucioso de todas as partes do veículo, utilizando ferramentas e produtos específicos para limpar, restaurar e proteger áreas que lavagens convencionais ignoram.'
    },
    {
        term: 'Clay Bar',
        definition: 'Barra de argila especial usada para remover contaminações táteis da superfície da pintura (como resinas de árvores e pulverizações), deixando-a lisa como vidro antes de ceras ou selantes.'
    },
    {
        term: 'Snow Foam',
        definition: 'Pré-lavagem com espuma densa que ajuda a soltar a sujeira grossa antes de tocar no carro, minimizando o risco de micro-riscos (swirl marks) durante o processo de esfregação.'
    },
    {
        term: 'Brilho de Espelho (Effect)',
        definition: 'Termo usado para descrever uma pintura perfeitamente corrigida e protegida, oferecendo reflexos nítidos e alta profundidade de brilho.'
    }
];

const Glossario = () => {
    return (
        <>
            <SEOHead
                title="Glossário de Estética Automotiva – Termos Técnicos"
                description="Entenda o que é Vitrificação, PPF, Detalhamento e mais. Guia completo de termos técnicos da estética automotiva para entusiastas e clientes."
            />

            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 text-center max-w-3xl mx-auto"
                    >
                        <div className="h-1 w-16 brand-gradient mb-6 mx-auto" />
                        <h1 className="text-4xl md:text-6xl font-heading mb-4 text-white">
                            Glossário <span className="text-gradient-brand">Técnico</span>
                        </h1>
                        <p className="text-muted-foreground">
                            A estética automotiva de alta performance simplificada. Conheça os principais termos e tecnologias que usamos na Prime Detail Uberlândia.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {terms.sort((a, b) => a.term.localeCompare(b.term)).map((item, i) => (
                            <motion.div
                                key={item.term}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 bg-card border border-border hover:border-primary/30 transition-colors"
                            >
                                <h3 className="text-xl font-heading text-primary mb-3 uppercase tracking-wider">{item.term}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {item.definition}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Glossario;
