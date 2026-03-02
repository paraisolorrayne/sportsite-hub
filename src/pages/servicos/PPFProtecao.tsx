import ServicePageLayout from '@/components/ServicePageLayout';
import { GalleryGroup } from '@/components/ServicePageLayout';
import { getServiceImages } from '@/lib/getServiceImages';

const { hero, all } = getServiceImages('ppf');

// Imagens (ordem alfabética):
// 0: F061BE77 — BMW azul resultado final (hero)
// 1: FBB87441 — Porsche azul capô com PPF sendo aplicado (parcial)
// 2: IMG_0212 — Técnico aplicando PPF na lateral de carro branco
// 3: IMG_1288 — Porsche azul vista de cima com PPF no capô
// 4: IMG_1404 — Porsche azul lateral resultado completo
// 5: IMG_2129 — Técnico aplicando PPF no capô da BMW azul
// 6: IMG_2179 — BMW azul resultado final vista de cima

const galleryGroups: GalleryGroup[] = [
    {
        title: 'Aplicação Peça a Peça — Porsche 718',
        type: 'process',
        images: [all[1], all[3], all[4]],
        labels: ['Aplicação no Capô', 'Inspeção e Acabamento', 'Resultado Final'],
    },
    {
        title: 'Aplicação Peça a Peça — BMW M340i',
        type: 'process',
        images: [all[5], all[6]],
        labels: ['Instalação no Capô', 'Resultado Final'],
    },
];

const PPFProtecao = () => {
    return (
        <ServicePageLayout
            title="PPF – Paint Protection Film"
            subtitle="A proteção definitiva e autorregenerativa para a pintura do seu veículo."
            description={`O PPF (Paint Protection Film) é a tecnologia mais avançada do mundo para proteção de superfícies automotivas. 
      Trata-se de uma película de poliuretano termoplástico transparente e extremamente resistente, aplicada sobre a pintura original. 
      Sua principal característica é a propriedade regenerativa (Healing): riscos superficiais desaparecem com a exposição ao calor, mantendo o carro sempre novo.`}
            heroImage={hero}
            heroVideo="/videos/ppf-hero.mp4"
            pricing="Sob consulta"
            benefits={[
                "Proteção real contra batidas de pedra e riscos profundos.",
                "Propriedade autorregenerativa (riscos somem com calor).",
                "Camada hidrofóbica que facilita a limpeza.",
                "Garantia de até 10 anos contra amarelamento ou craquelamento.",
            ]}
            process={[
                "Preparação rigorosa com descontaminação e polimento de brilho.",
                "Corte computadorizado (Plotter) sob medida para cada peça.",
                "Instalação com técnica húmida e acabamento invisível.",
                "Inspeção final e selagem das bordas.",
            ]}
            galleryGroups={galleryGroups}
            faqs={[
                {
                    q: "O PPF altera a cor do carro?",
                    a: "Não, ele é totalmente transparente e realça o brilho original. Também temos a opção de PPF Matte, que transforma a cor brilhante em fosca mantendo a proteção."
                },
                {
                    q: "Pode ser aplicado em qualquer peça?",
                    a: "Sim, pode ser aplicado em toda a lataria, faróis, retrovisores e até em partes internas de piano black."
                },
                {
                    q: "O que acontece se bater uma pedra no PPF?",
                    a: "A película absorve o impacto e protege a pintura original. Na maioria das vezes, o PPF se regenera ou, em casos extremos, basta trocar apenas a peça da película, mantendo a pintura intacta."
                }
            ]}
        />
    );
};

export default PPFProtecao;
