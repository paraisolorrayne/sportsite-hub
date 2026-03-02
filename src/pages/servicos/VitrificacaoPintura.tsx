import ServicePageLayout from '@/components/ServicePageLayout';
import { GalleryGroup } from '@/components/ServicePageLayout';
import { getServiceImages } from '@/lib/getServiceImages';

const { hero, all } = getServiceImages('vitrificacao');

// Imagens (ordem alfabética):
// 0: IMG_4034 — Chery Tiggo cinza resultado frontal
// 1: IMG_4051 — Chery Tiggo cinza resultado traseira/lateral
// Ambas são fotos de resultado do mesmo carro em ângulos diferentes.
// NÃO são antes/depois.

const galleryGroups: GalleryGroup[] = [
    {
        title: 'Resultado — Chery Tiggo 8 Pro',
        type: 'process',
        images: [all[0], all[1]],
        labels: ['Frente', 'Traseira'],
    },
];

const VitrificacaoPintura = () => {
    return (
        <ServicePageLayout
            title="Vitrificação de Pintura"
            subtitle="Proteção cerâmica 9H de alta durabilidade e brilho inigualável em Uberlândia."
            description={`A Vitrificação de Pintura da Prime Detail utiliza revestimentos cerâmicos de última geração (Ceramic Coating) que criam uma camada de vidro sobre o verniz. 
      Esta proteção oferece dureza extrema (9H), protegendo contra raios UV, fezes de pássaros, seiva de árvores e intempéries. 
      Além disso, proporciona uma autolimpeza incrível devido ao seu alto poder hidrofóbico (repele água e sujeira).`}
            heroImage={hero}
            heroVideo="/videos/vitrificacao-hero.mp4"
            pricing="A partir de R$ 1.200"
            benefits={[
                "Proteção contra agentes químicos e ambientais por até 3 anos.",
                "Facilidade na lavagem devido à alta repelência a líquidos.",
                "Brilho molhado permanente e profundidade de cor.",
                "Preservação do valor de revenda do veículo.",
            ]}
            process={[
                "Limpeza detalhada e descontaminação meticulosa.",
                "Polimento técnico para remover 100% das imperfeições.",
                "Aplicação controlada do vitrificador cerâmico.",
                "Cura em ambiente controlado para máxima aderência.",
            ]}
            galleryGroups={galleryGroups}
            faqs={[
                {
                    q: "Qual a durabilidade da vitrificação?",
                    a: "Empregamos produtos com durabilidade de 1 a 3 anos, dependendo da manutenção e do produto escolhido."
                },
                {
                    q: "Posso lavar o carro normalmente após vitrificar?",
                    a: "Sim, porém a lavagem deve ser feita sempre com shampoo de pH neutro e sem o uso de ceras baratas ou escovas."
                },
                {
                    q: "O carro fica blindado contra riscos?",
                    a: "A vitrificação aumenta a dureza do verniz, tornando-o mais resistente a riscos superficiais, mas não torna a pintura 'blindada' contra impactos de pedras ou riscos profundos."
                }
            ]}
        />
    );
};

export default VitrificacaoPintura;
