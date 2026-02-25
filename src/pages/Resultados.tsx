import { motion } from 'framer-motion';
import { Camera, Instagram, ArrowRight, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '@/components/SEOHead';

// Configuração do Feed Dinâmico
// Para ativar, basta criar um feed gratuito em Behold.so e substituir a URL abaixo.
const INSTAGRAM_FEED_URL = '';

const gallery = [
    { id: 1, title: 'Vitrificação BMW M3', type: '9H Coating' },
    { id: 2, title: 'Polimento Técnico Porsche', type: 'Correção Paint' },
    { id: 3, title: 'PPF Frontal Audi RS6', type: 'Proteção Definitiva' },
    { id: 4, title: 'Higienização Hilux', type: 'Detalhamento Interno' },
    { id: 5, title: 'Lavagem Motor Mercedes', type: 'Limpeza Técnica' },
    { id: 6, title: 'Tratamento Couro Land Rover', type: 'Interior Premium' },
];

const fetchInstagramPosts = async () => {
    if (!INSTAGRAM_FEED_URL) {
        // Fallback: Retorna os posts capturados anteriormente se não houver URL configurada
        return [
            { id: '1', media_url: 'https://instagram.fudi1-1.fna.fbcdn.net/v/t51.2885-15/618460536_1644998206878771_3241314485757294123_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fudi1-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QGQuCH4Qre3v-80CGc_uybHQlEqhw6xItJPkUf2j50RMnWqkK3ctqztaHEMZ8inVia2-rE15Af0ejSlaiEkffcu&_nc_ohc=dQd1NWEignYQ7kNvwEhuy_v&_nc_gid=3kjwDszswTvDUtZAc1tUMg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Aft9ZltUmbIVzosa8yCbBPr2yJevZDKpNPtI1SvqOT7K5g&oe=699FEBFC&_nc_sid=8b3546', permalink: 'https://www.instagram.com/primedetaill/reel/DTp4HxXFbtg/' },
            { id: '2', media_url: 'https://instagram.fudi1-2.fna.fbcdn.net/v/t51.2885-15/574345316_841359685010663_7166472194588943748_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fudi1-2.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QGQuCH4Qre3v-80CGc_uybHQlEqhw6xItJPkUf2j50RMnWqkK3ctqztaHEMZ8inVia2-rE15Af0ejSlaiEkffcu&_nc_ohc=WkYTRuIaA-YQ7kNvwFLdUvi&_nc_gid=3kjwDszswTvDUtZAc1tUMg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfsKrOUpW_XhPrs_iVIIys5ZbbgyANIMbz4Frm4Is9GvkQ&oe=69A01051&_nc_sid=8b3546', permalink: 'https://www.instagram.com/primedetaill/reel/DQu3XonDsuq/' },
            { id: '3', media_url: 'https://instagram.fudi1-2.fna.fbcdn.net/v/t51.2885-15/551011158_1358910275594298_5212488467712389286_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fudi1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QGQuCH4Qre3v-80CGc_uybHQlEqhw6xItJPkUf2j50RMnWqkK3ctqztaHEMZ8inVia2-rE15Af0ejSlaiEkffcu&_nc_ohc=zjtyzsYUZOQQ7kNvwFD8K65&_nc_gid=3kjwDszswTvDUtZAc1tUMg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afu46JDbQgQeXP46fUqRb0ZIT_qqa6mYxI-skjlIsZ5HPA&oe=699FFDB2&_nc_sid=8b3546', permalink: 'https://www.instagram.com/primedetaill/reel/DO37TdVDgvk/' },
            { id: '4', media_url: 'https://instagram.fudi1-2.fna.fbcdn.net/v/t51.2885-15/640295887_26686728784252542_7518753687072931180_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fudi1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QGQuCH4Qre3v-80CGc_uybHQlEqhw6xItJPkUf2j50RMnWqkK3ctqztaHEMZ8inVia2-rE15Af0ejSlaiEkffcu&_nc_ohc=rskwHDRXxI8Q7kNvwFO7-vu&_nc_gid=3kjwDszswTvDUtZAc1tUMg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfuOIKqxxj3VpfU04YEa0P1U4lTC75H3VQqY0m1wiptCYQ&oe=699FFED2&_nc_sid=8b3546', permalink: 'https://www.instagram.com/primedetaill/reel/DVBd2PACkgn/' },
            { id: '5', media_url: 'https://instagram.fudi1-2.fna.fbcdn.net/v/t51.2885-15/632254989_1931320334438515_2906219591655922583_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fudi1-2.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QGQuCH4Qre3v-80CGc_uybHQlEqhw6xItJPkUf2j50RMnWqkK3ctqztaHEMZ8inVia2-rE15Af0ejSlaiEkffcu&_nc_ohc=9YFUFu2lXokQ7kNvwFO8SGH&_nc_gid=3kjwDszswTvDUtZAc1tUMg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfuJb2x4jbWHhbRxNkvq0a9t8FOQtmFSZmLiZ8ry-PqhMg&oe=699FF6CB&_nc_sid=8b3546', permalink: 'https://www.instagram.com/primedetaill/reel/DU1T41wClVN/' },
            { id: '6', media_url: 'https://instagram.fudi1-2.fna.fbcdn.net/v/t51.2885-15/629238709_1587553215821322_8341038357272890613_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fudi1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QGQuCH4Qre3v-80CGc_uybHQlEqhw6xItJPkUf2j50RMnWqkK3ctqztaHEMZ8inVia2-rE15Af0ejSlaiEkffcu&_nc_ohc=yAdWhvGm7XkQ7kNvwFT53C-&_nc_gid=3kjwDszswTvDUtZAc1tUMg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfuzXjVqofAN3UU2HE_EWhVNMkRFMF9vn_iltpb3fWJM3A&oe=69A004F8&_nc_sid=8b3546', permalink: 'https://www.instagram.com/primedetaill/reel/DUtl82TFdk_/' },
        ];
    }
    const response = await fetch(INSTAGRAM_FEED_URL);
    if (!response.ok) throw new Error('Falha ao buscar feed do Instagram');
    const data = await response.json();
    return data.slice(0, 6);
};

const Resultados = () => {
    const { data: posts, isLoading, isError } = useQuery({
        queryKey: ['instagram-posts'],
        queryFn: fetchInstagramPosts,
        staleTime: 1000 * 60 * 30, // 30 minutos de cache
    });

    return (
        <>
            <SEOHead
                title="Resultados e Antes/Depois de Estética Automotiva"
                description="Veja a galeria de projetos entregues pela Prime Detail em Uberlândia. Resultados reais em vitrificação, polimento e PPF."
            />

            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 text-center max-w-2xl mx-auto"
                    >
                        <div className="h-1 w-16 brand-gradient mb-6 mx-auto" />
                        <h1 className="text-4xl md:text-6xl font-heading mb-4 text-white">
                            Nossos <span className="text-gradient-brand">Resultados</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Acompanhe a transformação de veículos que passaram pelo nosso centro técnico em Uberlândia.
                            Qualidade que você pode ver em cada detalhe.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gallery.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-square bg-secondary/50 border border-border overflow-hidden"
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 italic text-sm">
                                    [Imagem do Projeto: {item.title}]
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                    <span className="text-xs font-condensed uppercase tracking-widest text-primary mb-1 font-bold">
                                        {item.type}
                                    </span>
                                    <h3 className="text-xl font-heading text-white">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 space-y-12">
                        <div className="text-center space-y-4">
                            <Instagram className="w-12 h-12 text-primary mx-auto" />
                            <h2 className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider">Siga nosso Instagram</h2>
                            <p className="text-muted-foreground max-w-lg mx-auto">
                                Transformações reais em tempo real. Veja os detalhes de cada projeto em nosso feed oficial.
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                                    <p className="text-muted-foreground font-condensed uppercase tracking-widest text-sm text-center">Sincronizando Feed...</p>
                                </div>
                            ) : isError ? (
                                <div className="text-center py-10 border border-destructive/20 bg-destructive/5 rounded-sm">
                                    <p className="text-destructive text-sm italic">Não foi possível carregar o feed dinâmico agora.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts?.map((post: any, i: number) => (
                                        <motion.a
                                            key={post.id}
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group relative aspect-square bg-secondary overflow-hidden border border-border/50"
                                        >
                                            <img
                                                src={post.media_url}
                                                alt="Instagram post"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Instagram className="text-white w-8 h-8" />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="text-center pt-8">
                            <a
                                href="https://www.instagram.com/primedetaill/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-10 py-4 brand-gradient text-white font-condensed uppercase tracking-widest hover:opacity-90 transition-opacity glow-brand text-lg"
                            >
                                Ver perfil completo no Instagram <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Resultados;
