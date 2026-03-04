import ServicePageLayout from '@/components/ServicePageLayout';
import { GalleryGroup } from '@/components/ServicePageLayout';
import { getServiceImages } from '@/lib/getServiceImages';

const { hero, all } = getServiceImages('higienizacao');

// Imagens (ordem alfabética):
// 0: 5f4459e2 — Banco couro preto sujo  (hero)
// 1: IMG_0056 — Banco caramelo sujo
// 2: IMG_5586 — Banco preto com labels "Sujo" / "Limpo" lado a lado
// 3: IMG_5587 — Braço banco branco/bege limpo
// 4: IMG_5588 — Vedação borracha antes/depois (composição vertical)
// 5: IMG_5589 — Coluna cinto de segurança antes/depois (composição lado a lado)
// 6: IMG_5591 — Batente porta antes/depois com labels "Antes"/"Depois"

// As imagens 2, 4, 5 e 6 já são composições antes/depois em uma única foto.
// IMG_0056 (1) → IMG_5587 (3) = banco sujo → banco limpo (mesmo estilo de enquadramento)

const galleryGroups: GalleryGroup[] = [
    {
        title: 'Banco de Couro',
        type: 'process',
        images: [all[1], all[3]],
        labels: ['', ''],
    },
    {
        title: 'Detalhes do Processo',
        type: 'process',
        images: [all[2], all[5], all[6]],
        labels: ['Banco — Sujo vs Limpo', 'Coluna do Cinto', 'Batente da Porta'],
    },
];

const HigienizacaoInterna = () => {
    return (
        <ServicePageLayout
            title="Higienização Interna"
            subtitle="Saúde e bem-estar dentro do seu carro com limpeza profunda de nível hospitalar."
            description={`As imagens falam por si. Veja como nossa técnica de higienização interna transforma o couro, removendo toda sujidade acumulada e deixando o interior do seu veículo como novo.
            
            A Higienização Interna da Prime Detail remove sujeiras invisíveis, ácaros, fungos e bactérias que se acumulam nos tecidos e carpetes. Utilizamos extratoras profissionais e produtos bactericidas de última geração que não agridem as fibras dos tecidos nem ressecam o couro.`}
            heroImage={hero}
            heroVideo="/videos/higienizacao-hero.mp4"
            pricing="A partir de R$ 350"
            benefits={[
                "Eliminação de odores desagradáveis e manchas de tecido.",
                "Proteção e hidratação de bancos de couro genuíno.",
                "Remoção de ácaros e bactérias prejudiciais à saúde.",
                "Limpeza técnica de teto, cintos de segurança e painéis.",
            ]}
            process={[
                "Aspiração profunda de todo o habitáculo.",
                "Extração de sujeira com produtos bactericidas premium.",
                "Limpeza detalhada de painéis e frestas internas.",
                "Condicionamento de plásticos e hidratação de couro.",
            ]}
            galleryGroups={galleryGroups}
            faqs={[
                {
                    q: "A higienização remove manchas de banco?",
                    a: "Na maioria dos casos, sim. Removendo manchas de uso comum, gordura e derramamento de líquidos. Manchas muito antigas ou químicas podem ser mais difíceis, mas garantimos a melhor melhora possível."
                },
                {
                    q: "Quanto tempo demora para secar?",
                    a: "Com o uso de extratoras e ventiladores de alta potência, o veículo fica seco e pronto para uso em poucas horas."
                },
                {
                    q: "Inclui limpeza de ar-condicionado?",
                    a: "Realizamos a oxi-sanitização (gerador de ozônio) que elimina fungos no sistema de ventilação, sendo um excelente complemento à higienização."
                }
            ]}
        />
    );
};

export default HigienizacaoInterna;
