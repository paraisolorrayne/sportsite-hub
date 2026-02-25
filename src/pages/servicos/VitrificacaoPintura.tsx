import ServicePageLayout from '@/components/ServicePageLayout';
import heroImage from '@/assets/vitrificacao/IMG_4034.jpg';
import gal1 from '@/assets/vitrificacao/IMG_4051.jpg';
// Foto adicional do processo
import gal2 from '@/assets/vitrificacao/IMG_4035.jpg';

const VitrificacaoPintura = () => {
    return (
        <ServicePageLayout
            title="Vitrificação de Pintura"
            subtitle="Proteção cerâmica 9H de alta durabilidade e brilho inigualável em Uberlândia."
            description={`A Vitrificação de Pintura da Prime Detail utiliza revestimentos cerâmicos de última geração (Ceramic Coating) que criam uma camada de vidro sobre o verniz. 
      Esta proteção oferece dureza extrema (9H), protegendo contra raios UV, fezes de pássaros, seiva de árvores e intempéries. 
      Além disso, proporciona uma autolimpeza incrível devido ao seu alto poder hidrofóbico (repele água e sujeira).`}
            heroImage={heroImage}
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
            gallery={[heroImage, gal1, gal2]}
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
