import ServicePageLayout from '@/components/ServicePageLayout';
import heroImage from '@/assets/ppf/IMG_0212.jpg';
import gal1 from '@/assets/ppf/IMG_1288.jpg';
import gal2 from '@/assets/ppf/IMG_1404.jpg';
import gal3 from '@/assets/ppf/IMG_2129.jpg';
// Fotos adicionais do processo de aplicação
import gal4 from '@/assets/ppf/IMG_2179.jpg';
import gal5 from '@/assets/ppf/IMG_9886.jpg';
import gal6 from '@/assets/ppf/6B900981-A434-4CA3-AC31-AA31773194C0.jpg';
import gal7 from '@/assets/ppf/F061BE77-43CD-4860-B8ED-096F115E8B7F.jpg';
import gal8 from '@/assets/ppf/FBB87441-46B3-47E3-AE3C-4EA7E58AF1FB.jpg';

const PPFProtecao = () => {
    return (
        <ServicePageLayout
            title="PPF – Paint Protection Film"
            subtitle="A proteção definitiva e autorregenerativa para a pintura do seu veículo."
            description={`O PPF (Paint Protection Film) é a tecnologia mais avançada do mundo para proteção de superfícies automotivas. 
      Trata-se de uma película de poliuretano termoplástico transparente e extremamente resistente, aplicada sobre a pintura original. 
      Sua principal característica é a propriedade regenerativa (Healing): riscos superficiais desaparecem com a exposição ao calor, mantendo o carro sempre novo.`}
            heroImage={heroImage}
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
            gallery={[gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8]}
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
