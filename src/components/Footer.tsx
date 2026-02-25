import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer aria-label="Rodapé do site" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img
                src="/logo_prime.png"
                alt="Prime Detail – Estética Automotiva em Uberlândia"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Estética automotiva de alta performance em Uberlândia. Cuidamos de cada detalhe com produtos premium e técnicas avançadas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-sm text-foreground mb-6">Navegação</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {[
                { label: 'Início', to: '/' },
                { label: 'Sobre', to: '/sobre' },
                { label: 'Serviços', to: '/servicos' },
                { label: 'Resultados', to: '/resultados' },
                { label: 'Glossário', to: '/glossario' },
                { label: 'Guia de Cuidados', to: '/guia-cuidados' },
                { label: 'Contato', to: '/contato' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm text-foreground mb-6">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">Uberlândia, MG</span>
              <a href="tel:34984033956" className="hover:text-primary transition-colors">(34) 98403-3956</a>
              <a href="mailto:contato@primedetail.com.br" className="hover:text-primary transition-colors">contato@primedetail.com.br</a>
              <div className="flex gap-4 mt-2">
                <a href="https://www.instagram.com/primedetaill/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
                <a href="https://wa.me/5534984033956" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Prime Detail. Uberlândia, Minas Gerais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
