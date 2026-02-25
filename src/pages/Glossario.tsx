import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

const terms = [
    {
        term: 'Vitrificação (Ceramic Coating)',
        definition: 'Processo de aplicação de uma camada de sílica vítrea (vidro líquido) sobre a pintura do carro, criando uma proteção de alta dureza (geralmente 9H na escala Mohs de lápis) que repele água, sujeira e protege contra raios UV e oxidação. A vitrificação cerâmica pode durar de 2 a 5 anos dependendo do produto utilizado e dos cuidados de manutenção. Na Prime Detail, utilizamos vitrificações de marcas líderes mundiais como Ceramic Pro e Gyeon, que oferecem hidrofobicidade extrema e facilidade de limpeza. Após a aplicação, a pintura ganha um brilho profundo e fica significativamente mais fácil de lavar, já que a sujeira não adere à superfície tratada.',
    },
    {
        term: 'PPF (Paint Protection Film)',
        definition: 'Película termoplástica transparente de poliuretano aplicada sobre superfícies pintadas para proteção física contra impactos de pedras, riscos, arranhões e desgaste ambiental. É considerada a proteção mais completa disponível no mercado automotivo. A principal característica do PPF moderno é a propriedade autorregenerativa (self-healing): riscos superficiais na película desaparecem quando expostos ao calor, seja do sol ou de água morna. As melhores marcas, como XPEL, oferecem garantia de até 10 anos contra amarelamento, craquelamento ou descolamento. O PPF pode ser aplicado em toda a lataria, faróis, retrovisores e até em peças com acabamento piano black.',
    },
    {
        term: 'Polimento Técnico',
        definition: 'Procedimento profissional de correção de pintura que utiliza máquinas rotativas e orbitais com massas de corte abrasivas de diferentes granulometrias. O objetivo é remover defeitos como micro-riscos (swirl marks), hologramas, marcas de lavagem e oxidação superficial, restaurando o brilho e a profundidade original da cor. Diferente do polimento amador, o polimento técnico é realizado por etapas (corte, refino e lustro) e exige medição da espessura do verniz com medidor de camada antes de iniciar. Isso garante que a correção seja feita com segurança, sem comprometer a integridade do verniz original.',
    },
    {
        term: 'Descontaminação Ferrosa',
        definition: 'Processo químico que remove partículas metálicas de ferro incrustadas na pintura, rodas e vidros. Essas partículas vêm principalmente do desgaste das pastilhas de freio e da poluição industrial, e se fixam na superfície de forma invisível a olho nu. O produto descontaminante reage com o ferro e muda de cor (geralmente para roxo/vermelho), indicando a dissolução das partículas. Essa etapa é essencial antes de qualquer polimento ou aplicação de proteção cerâmica, pois garante que a superfície esteja completamente limpa e livre de contaminantes que poderiam ser selados sob a camada de proteção.',
    },
    {
        term: 'Detailing (Detalhamento)',
        definition: 'Cuidado exaustivo e minucioso de todas as partes do veículo — externas e internas —, utilizando ferramentas e produtos específicos para limpar, restaurar e proteger áreas que lavagens convencionais ignoram. O detalhamento inclui a limpeza de frestas com pincéis especiais, tratamento de plásticos e borrachas, condicionamento de couro, polimento de cromados e até a limpeza do vão do motor. Na estética automotiva profissional, o detalhamento é a base para qualquer serviço de proteção, pois prepara o veículo para receber vitrificação, PPF ou cera de alta performance.',
    },
    {
        term: 'Clay Bar',
        definition: 'Barra de argila sintética especial usada para remover contaminações táteis da superfície da pintura que não saem com lavagem comum, como resinas de árvores, respingos de tinta industrial, overspray e deposições minerais. Ao passar a clay bar sobre a pintura lubrificada, ela arranca essas partículas sem riscar, deixando a superfície completamente lisa ao toque — como vidro. Essa etapa é indispensável antes de polir ou aplicar qualquer proteção cerâmica, pois garante aderência perfeita do produto à pintura.',
    },
    {
        term: 'Snow Foam',
        definition: 'Pré-lavagem com espuma densa e de alta lubrificação, aplicada com canhão de espuma acoplado à lavadora de alta pressão. A espuma encapsula e dissolve a sujeira pesada (lama, poeira, dejetos de pássaros) antes de qualquer contato físico com a pintura. Isso reduz drasticamente o risco de micro-riscos (swirl marks) causados pelo arraste de partículas durante a esfregação. É a primeira etapa de uma lavagem segura e profissional no processo de detalhamento automotivo.',
    },
    {
        term: 'Brilho de Espelho (Mirror Effect)',
        definition: 'Termo usado para descrever o acabamento de uma pintura que foi perfeitamente corrigida por polimento técnico e protegida com vitrificação ou cera de alta performance. O resultado é uma superfície com reflexos nítidos, alta profundidade de cor e brilho intenso — semelhante a um espelho. Para atingir esse nível, é necessário um processo completo de descontaminação, correção em múltiplas etapas e aplicação de proteção de alto brilho.',
    },
    {
        term: 'Swirl Marks (Micro-riscos Circulares)',
        definition: 'Riscos finos e circulares visíveis na pintura quando expostos à luz solar direta ou iluminação pontual. São causados principalmente por lavagens incorretas, uso de panos secos ou esponjas inadequadas. Os swirl marks são o defeito mais comum em pinturas automotivas e só podem ser completamente removidos por polimento técnico com máquina. Na Prime Detail, utilizamos iluminação de inspeção profissional para identificar e corrigir 100% dos swirl marks durante o processo de polimento.',
    },
    {
        term: 'Hidrofobicidade (Efeito Repelente de Água)',
        definition: 'Propriedade de uma superfície tratada que faz com que a água forme gotas esféricas e escorra rapidamente, levando consigo sujeira e impurezas. É uma das principais características da vitrificação cerâmica e de selantes de alta performance. Quanto maior a hidrofobicidade, mais fácil é manter o veículo limpo entre lavagens. Superfícies com boa hidrofobicidade apresentam ângulo de contato da gota de água superior a 100°, enquanto vitrificações premium podem atingir ângulos acima de 110°.',
    },
    {
        term: 'Self-Healing (Autorregeneração)',
        definition: 'Propriedade exclusiva de películas PPF de alta qualidade que permite que riscos superficiais na película desapareçam sozinhos quando expostos ao calor. O mecanismo funciona porque o poliuretano termoplástico do PPF possui memória elástica: ao ser aquecido (pelo sol, água morna ou soprador térmico), as moléculas do polímero retornam à sua posição original, eliminando a marca do risco. Essa propriedade se mantém ativa durante toda a vida útil da película, que pode ser de até 10 anos.',
    },
    {
        term: 'Correção de Pintura',
        definition: 'Processo profissional que visa eliminar imperfeições da pintura automotiva — como riscos, hologramas, marcas de água ácida e oxidação — utilizando técnicas de polimento em múltiplas etapas. A correção é classificada por intensidade: leve (apenas refino), moderada (corte e refino) ou intensiva (lixamento úmido, corte, refino e lustro). Antes de iniciar, o profissional mede a espessura do verniz com um medidor de camada para determinar quanto material pode ser removido com segurança.',
    },
    {
        term: 'Selante de Pintura (Paint Sealant)',
        definition: 'Proteção sintética de pintura com durabilidade intermediária, geralmente entre 3 e 12 meses. Diferente da cera natural (que oferece brilho quente mas dura poucas semanas), o selante sintético forma uma barreira química mais resistente contra UV, chuva ácida e contaminantes. É uma opção de custo-benefício para quem deseja proteção sem investir em vitrificação cerâmica, ou como camada adicional de manutenção entre aplicações de coating.',
    },
    {
        term: 'Película de Controle Solar',
        definition: 'Filme aplicado nos vidros do veículo para reduzir a transmissão de calor e raios ultravioleta ao interior. As películas profissionais de controle solar podem rejeitar até 99% dos raios UV e até 60% do calor infravermelho, proporcionando maior conforto térmico, economia de ar-condicionado e proteção do painel, bancos e revestimentos contra desbotamento. Diferente do PPF (que protege a pintura), a película de controle solar é específica para vidros.',
    },
    {
        term: 'Higienização Interna Profissional',
        definition: 'Limpeza profunda do interior do veículo que vai muito além da aspiração convencional. Inclui extração a quente de bancos e carpetes (remove ácaros, fungos e bactérias), limpeza de teto com produtos específicos, tratamento de couro com hidratante, limpeza de saídas de ar-condicionado, painel e console. Esse processo elimina odores, manchas e alergênicos, restaurando a aparência e higiene do habitáculo. É especialmente recomendado para veículos com crianças, animais de estimação ou após longos períodos sem limpeza.',
    },
];

const Glossario = () => {
    return (
        <>
            <SEOHead
                title="Glossário de Estética Automotiva – Termos Técnicos"
                description="Glossário completo de estética automotiva: o que é vitrificação, PPF, polimento técnico, ceramic coating, clay bar e mais. Aprenda os termos antes de cuidar do seu carro em Uberlândia."
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
