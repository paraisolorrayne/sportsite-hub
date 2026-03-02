import ServicePageLayout from '@/components/ServicePageLayout';
import { GalleryGroup } from '@/components/ServicePageLayout';
import { getServiceImages } from '@/lib/getServiceImages';

const { hero, all } = getServiceImages('lavada-detalhada');

// Imagens (ordem alfabética do nome do arquivo):
// 0:  IMG_1237 — VW Amarok motor SUJO (hero)
// 1:  IMG_1258 — VW Amarok motor LIMPO
// 2:  IMG_1428 — Range Rover no elevador
// 3:  IMG_1816 — Porsche Macan vermelho resultado
// 4:  IMG_1976 — Audi RS com snow foam
// 5:  IMG_2082 — Porsche 911 no elevador + produtos
// 6:  IMG_2114 — Chassi por baixo (lavagem caixa de roda)
// 7:  IMG_2154 — Porsche 911 c/ foam
// 8:  IMG_2162 — Audi RS6 preto resultado
// 9:  IMG_2165 — Audi RS6 detalhe lateral resultado
// 10: IMG_2249 — Porsche + Audi na oficina resultado
// 11: IMG_2289 — Porsche 911 prata resultado
// 12: IMG_3963 — Chevrolet S10 motor SUJO
// 13: IMG_4016 — Chevrolet S10 motor LIMPO
// 14: IMG_9176 — Fiat Toro SUJA por inteiro
// 15: IMG_9365 — Fiat Toro LIMPA por inteiro

const galleryGroups: GalleryGroup[] = [
    {
        title: 'Antes e Depois — Exterior',
        type: 'before-after',
        images: [all[14], all[15]],
        // Fiat Toro suja → Fiat Toro limpa
    },
    {
        title: 'Antes e Depois — Motor',
        type: 'before-after',
        images: [all[0], all[1]],
        // VW Amarok motor sujo → VW Amarok motor limpo
    },
    {
        title: 'Antes e Depois — Detalhes',
        type: 'before-after',
        images: [all[12], all[13]],
        // Chevrolet motor sujo → Chevrolet motor limpo
    },
    {
        title: 'Processo de Lavagem',
        type: 'process',
        images: [all[4], all[7], all[6], all[11]],
        labels: ['Pré-lavagem Snow Foam', 'Lavagem Técnica', 'Limpeza de Chassi', 'Resultado Final'],
    },
];

const LavagemDetalhada = () => {
    return (
        <ServicePageLayout
            title="Lavagem Detalhada"
            subtitle="O cuidado que seu veículo merece, muito além de um banho convencional em Uberlândia."
            description={`A Lavagem Detalhada da Prime Detail é um processo artesanal projetado para remover contaminantes sem agredir a superfície do veículo. 
      Utilizamos a técnica de "Dois Baldes" e pincéis de cerdas macias para limpar cada fresta, emblema e vedação, onde a sujeira acumulada pode causar danos a longo prazo.
      Ao contrário de lavadores comuns, focamos na conservação da proteção já existente ou na preparação para novos tratamentos.`}
            heroImage={hero}
            heroVideo="/videos/lavada-hero.mp4"
            pricing="A partir de R$ 150"
            benefits={[
                "Remoção de contaminação ferrosa e industrial.",
                "Limpeza técnica de caixas de roda e suspensão.",
                "Secagem com ar comprimido para evitar marcas de água.",
                "Proteção básica de pintura (selante) inclusa.",
            ]}
            process={[
                "Pré-lavagem com Snow Foam para soltar a sujeira pesada.",
                "Lavagem técnica com luvas de microfibra de alta gramatura.",
                "Limpeza minuciosa de frestas com pincéis específicos.",
                "Condicionamento de plásticos e pneus com produtos premium.",
            ]}
            galleryGroups={galleryGroups}
            faqs={[
                {
                    q: "Quanto tempo leva a lavagem detalhada?",
                    a: "Em média de 4 a 6 horas, dependendo do nível de sujeira e do porte do veículo."
                },
                {
                    q: "Vocês lavam o motor também?",
                    a: "A lavagem de motor é um serviço opcional que pode ser adicionado à lavagem detalhada, utilizando técnica de limpeza a seco ou vapor."
                },
                {
                    q: "Qual a diferença para uma lavagem de posto?",
                    a: "A lavagem de posto usa escovas ou panos sujos que riscam a pintura. Nós usamos técnicas que protegem a verniz e produtos de pH neutro que não ressecam plásticos e borrachas."
                }
            ]}
        />
    );
};

export default LavagemDetalhada;
