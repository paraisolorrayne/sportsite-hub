import ServicePageLayout from '@/components/ServicePageLayout';
import heroImage from '@/assets/lavada-detalhada/IMG_9176.jpg';
import gal1 from '@/assets/lavada-detalhada/IMG_1237.jpg';
import gal2 from '@/assets/lavada-detalhada/IMG_2154.jpg';
import gal3 from '@/assets/lavada-detalhada/IMG_9365.jpg';
// Fotos adicionais do processo
import gal4 from '@/assets/lavada-detalhada/IMG_1258.jpg';
import gal5 from '@/assets/lavada-detalhada/IMG_1428.jpg';
import gal6 from '@/assets/lavada-detalhada/IMG_1815.jpg';
import gal7 from '@/assets/lavada-detalhada/IMG_1816.jpg';
import gal8 from '@/assets/lavada-detalhada/IMG_1976.jpg';
import gal9 from '@/assets/lavada-detalhada/IMG_2082.jpg';
import gal10 from '@/assets/lavada-detalhada/IMG_2114.jpg';
import gal11 from '@/assets/lavada-detalhada/IMG_2162.jpg';
import gal12 from '@/assets/lavada-detalhada/IMG_2165.jpg';
import gal13 from '@/assets/lavada-detalhada/IMG_2249.jpg';
import gal14 from '@/assets/lavada-detalhada/IMG_2289.jpg';
import gal15 from '@/assets/lavada-detalhada/IMG_3963.jpg';
import gal16 from '@/assets/lavada-detalhada/IMG_4016.jpg';
import gal17 from '@/assets/lavada-detalhada/IMG_9489.jpg';
import gal18 from '@/assets/lavada-detalhada/IMG_9513.jpg';

const LavagemDetalhada = () => {
    return (
        <ServicePageLayout
            title="Lavagem Detalhada"
            subtitle="O cuidado que seu veículo merece, muito além de um banho convencional em Uberlândia."
            description={`A Lavagem Detalhada da Prime Detail é um processo artesanal projetado para remover contaminantes sem agredir a superfície do veículo. 
      Utilizamos a técnica de "Dois Baldes" e pincéis de cerdas macias para limpar cada fresta, emblema e vedação, onde a sujeira acumulada pode causar danos a longo prazo.
      Ao contrário de lavadores comuns, focamos na conservação da proteção já existente ou na preparação para novos tratamentos.`}
            heroImage={heroImage}
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
            gallery={[gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal12, gal13, gal14, gal15, gal16, gal17, gal18]}
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
