/**
 * Auto-descoberta de imagens por serviço usando import.meta.glob do Vite.
 *
 * Como funciona:
 * - O Vite escaneia todas as imagens em src/assets/ no build time.
 * - Apenas arquivos .jpg, .jpeg, .png, .webp são considerados.
 * - Arquivos .heic, .mov, .MOV são automaticamente ignorados.
 * - A primeira imagem (ordem alfabética do nome de arquivo) é o Hero.
 * - As demais viram galeria.
 *
 * Para adicionar/remover imagens: basta colocar ou tirar o arquivo da pasta.
 * O site atualiza automaticamente (HMR em dev, rebuild em prod).
 */

// Glob eager: carrega todas as imagens de todas as pastas de serviço em build time.
// O Vite processa, otimiza e gera hashes de cache para cada imagem.
const allImageModules = import.meta.glob<string>(
  '/src/assets/**/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

export interface ServiceImages {
  /** Primeira imagem da pasta (ordem alfabética) — usada como hero/poster */
  hero: string;
  /** Todas as imagens restantes — usadas como galeria */
  gallery: string[];
  /** Todas as imagens (hero + galeria) */
  all: string[];
}

/**
 * Retorna as imagens de um serviço a partir do nome da pasta em src/assets/.
 *
 * @param folder - Nome da pasta dentro de src/assets/ (ex: 'ppf', 'polimento', 'lavada-detalhada')
 * @returns { hero, gallery, all } — strings são URLs processadas pelo Vite
 *
 * @example
 * const { hero, gallery } = getServiceImages('ppf');
 * // hero = primeira imagem (poster/hero)
 * // gallery = todas as outras imagens
 */
export function getServiceImages(folder: string): ServiceImages {
  const prefix = `/src/assets/${folder}/`;

  const images = Object.entries(allImageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

  return {
    hero: images[0] ?? '',
    gallery: images.slice(1),
    all: images,
  };
}

/**
 * Retorna a URL do vídeo hero de um serviço, se existir.
 * Vídeos ficam em public/videos/{videoKey}-hero.mp4
 *
 * @param videoKey - Chave do vídeo (ex: 'ppf', 'lavada', 'polimento')
 * @returns URL do vídeo ou undefined
 */
export function getServiceHeroVideo(videoKey: string): string | undefined {
  // Mapeamento de pastas para chaves de vídeo existentes
  const videoMap: Record<string, string> = {
    'lavada-detalhada': 'lavada',
    'polimento': 'polimento',
    'vitrificacao': 'vitrificacao',
    'ppf': 'ppf',
    'higienizacao': 'higienizacao',
    'pelicula-protecao-solar': 'pelicula',
  };

  const key = videoMap[videoKey] ?? videoKey;
  return `/videos/${key}-hero.mp4`;
}

/** Lista de pastas de serviço conhecidas (para uso na listagem principal) */
export const SERVICE_FOLDERS = [
  'lavada-detalhada',
  'polimento',
  'vitrificacao',
  'ppf',
  'higienizacao',
  'pelicula-protecao-solar',
] as const;

export type ServiceFolder = (typeof SERVICE_FOLDERS)[number];

