import ServicePageLayout from '@/components/ServicePageLayout';
import heroImage from '@/assets/polimento/IMG_0992.jpg';
import gal1 from '@/assets/polimento/IMG_1751.jpg';
import gal2 from '@/assets/polimento/IMG_9439.jpg';
import gal3 from '@/assets/polimento/IMG_9440.jpg';

const PolimentoTecnico = () => {
    return (
        <ServicePageLayout
            title="Polimento Técnico"
            subtitle="Recupere o brilho de carro zero e elimine imperfeições da pintura em Uberlândia."
            description={`O Polimento Técnico da Prime Detail não é apenas um "lustro". É um processo de correção de verniz que remove riscos superficiais (swirl marks), manchas de chuva ácida, oxidação e hologramas causados por polimentos mal executados.
      Utilizamos máquinas de última geração (Roto-orbitais) e compostos polidores de alta tecnologia que preservam a espessura do verniz enquanto devolvem a profundidade e o reflexo máximo da cor.`}
            heroImage={heroImage}
            heroVideo="/videos/polimento-hero.mp4"
            pricing="A partir de R$ 500"
            benefits={[
                "Remoção definitiva de riscos e marcas de lavagem.",
                "Restauração do brilho e profundidade das cores.",
                "Superfície extremamente lisa e reflexiva.",
                "Essencial para uma boa ancoragem da vitrificação.",
            ]}
            process={[
                "Descontaminação da pintura com Clay Bar.",
                "Mascaramento de borrachas e emblemas.",
                "Fase de Corte (se necessário) para remover riscos profundos.",
                "Fase de Refino e Lustro para acabamento impecável.",
            ]}
            gallery={[gal1, gal2, gal3]}
            faqs={[
                {
                    q: "O polimento remove qualquer risco?",
                    a: "Remove riscos que estão na camada do verniz. Riscos que ultrapassaram o verniz e atingiram a tinta (que você sente com a unha) geralmente exigem retoque de pintura."
                },
                {
                    q: "O polimento desgasta muito o verniz?",
                    a: "Nossa técnica de polimento técnico visa remover a menor quantidade possível de verniz, focando na correção e não apenas no desgaste."
                },
                {
                    q: "Quanto tempo dura o brilho do polimento?",
                    a: "O brilho é resultado da correção da superfície. Se o carro for lavado corretamente, dura anos. Recomendamos proteger com cera premium ou vitrificação após o processo."
                }
            ]}
        />
    );
};

export default PolimentoTecnico;
