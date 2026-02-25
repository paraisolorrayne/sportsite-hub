/**
 * Utilitário simples para rastreamento de CTAs.
 * Pode ser integrado com Google Analytics, Pixel ou Tag Manager futuramente.
 */
export const trackCTA = (ctaId: string) => {
    console.log(`[Analytics] CTA Clicked: ${ctaId}`);

    // Exemplo de integração futura com GA4:
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', 'cta_click', {
    //     'cta_id': ctaId,
    //     'page': window.location.pathname
    //   });
    // }
};

/**
 * Hook para adicionar tracking automático a elementos com data-cta
 */
export const initCTAListeners = () => {
    if (typeof document === 'undefined') return;

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const ctaElement = target.closest('[data-cta]');
        if (ctaElement) {
            const ctaId = ctaElement.getAttribute('data-cta');
            if (ctaId) trackCTA(ctaId);
        }
    });
};
