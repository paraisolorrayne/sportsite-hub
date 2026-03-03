import ServicePageLayout from '@/components/ServicePageLayout';
import { getServiceImages, getServiceHeroVideo } from '@/lib/getServiceImages';

const { hero, gallery } = getServiceImages('pelicula-protecao-solar');

const PeliculaControleSolar = () => {
    return (
        <ServicePageLayout
            title="Película de Controle Solar"
            subtitle="Conforto térmico premium e proteção UV extrema para você e seu veículo."
            description={`Na Prime Detail, oferecemos películas de controle solar de alta performance que vão muito além da estética. 
      Nossas películas de Cerâmica reduzem drasticamente a entrada de calor no habitáculo, melhorando a eficiência do ar-condicionado e protegendo o interior contra o desbotamento causado pelo sol de Uberlândia.
      Com alta transparência ótica e rejeição de infravermelho, garantimos estilo com máxima proteção.`}
            heroImage={hero}
            heroVideo={getServiceHeroVideo('pelicula-protecao-solar')}
            gallery={gallery}
            pricing="A partir de R$ 400"
            benefits={[
                "Redução de até 80% do calor interno.",
                "Bloqueio de 99% dos raios UV prejudiciais.",
                "Mais privacidade e segurança para os ocupantes.",
                "Proteção dos bancos de couro e painéis contra rachaduras.",
            ]}
            process={[
                "Limpeza profunda dos vidros para evitar contaminação.",
                "Moldagem térmica perfeita acompanhando a curvatura do vidro.",
                "Aplicação precisa sem bolhas ou falhas de acabamento.",
                "Verificação final de qualidade e aderência.",
            ]}
            faqs={[
                {
                    q: "A película interfere na visibilidade noturna?",
                    a: "Utilizamos tecnologias que oferecem excelente visibilidade interna, mesmo em tonalidades mais escuras."
                },
                {
                    q: "Qual a diferença das películas de cerâmica?",
                    a: "Películas de carbono ou tintadas apenas escurecem. As de cerâmica bloqueiam o calor de verdade sem interferir em sinais de GPS ou celular."
                },
                {
                    q: "Tem garantia contra desbotamento?",
                    a: "Sim, nossas películas premium possuem garantia contra desbotamento, bolhas e descascamento."
                }
            ]}
        />
    );
};

export default PeliculaControleSolar;
