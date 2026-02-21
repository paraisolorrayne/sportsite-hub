import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 racing-gradient rounded-sm rotate-45" />
              <span className="font-heading text-xl tracking-wider text-foreground">
                SPEED<span className="text-gradient-racing">AUTO</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Estética automotiva de alta performance. Cuidamos do seu carro como ele merece.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-sm text-foreground mb-4">Navegação</h4>
            <div className="flex flex-col gap-2">
              {['Home', 'Sobre', 'Serviços', 'Blog', 'Contato'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm text-foreground mb-4">Contato</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>contato@speedauto.com.br</span>
              <span>(11) 99999-9999</span>
              <span>São Paulo, SP</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SpeedAuto. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
