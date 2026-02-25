import ServicePageLayout from '@/components/ServicePageLayout';
import heroImage from '@/assets/higienizacao/IMG_0056.jpg';
import gal1 from '@/assets/higienizacao/5f4459e2-2028-46a2-8920-66dee302caff.jpg';
// Foto adicional do processo
import gal2 from '@/assets/higienizacao/IMG_0057.jpg';

const HigienizacaoInterna = () => {
    return (
        <ServicePageLayout
            title="Higienização Interna"
            subtitle="Saúde e bem-estar dentro do seu carro com limpeza profunda de nível hospitalar."
            description={`A Higienização Interna da Prime Detail remove sujeiras invisíveis, ácaros, fungos e bactérias que se acumulam nos tecidos e carpetes. 
      Utilizamos extratoras profissionais e produtos bactericidas de última geração que não agridem as fibras dos tecidos nem ressecam o couro. 
      Deixe o interior do seu veículo com aspecto e aroma de novo.`}
            heroImage={heroImage}
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
            gallery={[heroImage, gal1, gal2]}
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
