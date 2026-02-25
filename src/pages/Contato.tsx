import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Contato = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    setSent(true);
  };

  const whatsappNumber = "5534984033956";
  const address = "Rua Exemplo, 123 - Bairro Estética, Uberlândia - MG";

  return (
    <>
      <SEOHead
        title="Contato e Localização Uberlândia"
        description="Entre em contato com a Prime Detail Uberlândia. Agende sua lavagem técnica, polimento ou vitrificação. Atendimento premium."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="h-1 w-16 brand-gradient mb-6" />
            <h1 className="text-4xl md:text-6xl font-heading mb-4 text-white">
              Fale <span className="text-gradient-brand">Conosco</span>
            </h1>
            <p className="text-muted-foreground">Estamos prontos para atender você em Uberlândia.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Direct Contact Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-8 bg-card border border-border hover:border-primary/50 transition-all text-center group"
                >
                  <MessageCircle className="w-10 h-10 text-[#25D366] mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-heading text-white uppercase tracking-wider">WhatsApp</span>
                  <span className="text-xs text-muted-foreground mt-1">Resposta instantânea</span>
                </a>
                <a
                  href="https://www.instagram.com/primedetaill/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-8 bg-card border border-border hover:border-primary/50 transition-all text-center group"
                >
                  <Instagram className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-heading text-white uppercase tracking-wider">Instagram</span>
                  <span className="text-xs text-muted-foreground mt-1">Veja nossos projetos</span>
                </a>
              </div>

              {[
                { icon: MapPin, label: 'Localização', value: address },
                { icon: Phone, label: 'Telefone', value: '(34) 98403-3956' },
                { icon: Mail, label: 'E-mail Comercial', value: 'contato@primedetail.com.br' },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4 p-6 bg-card border border-border">
                  <info.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-1 font-bold">
                      {info.label}
                    </h3>
                    <p className="text-white text-base">{info.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-10 border border-border"
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Send size={32} />
                  </div>
                  <h3 className="font-heading text-3xl text-white uppercase">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">Obrigado pelo contato. Nossa equipe técnica retornará em breve.</p>
                  <button onClick={() => setSent(false)} className="text-primary hover:underline text-sm font-condensed uppercase tracking-widest pt-4">Enviar outra mensagem</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h3 className="font-heading text-2xl text-white uppercase mb-4">Envie um e-mail</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'name', label: 'Nome Completo', type: 'text' },
                      { name: 'phone', label: 'WhatsApp / Telefone', type: 'tel' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block font-condensed text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required
                          value={form[field.name as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary border border-border text-white focus:border-primary focus:outline-none transition-colors rounded-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block font-condensed text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">
                      Seu Melhor E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border text-white focus:border-primary focus:outline-none transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-condensed text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">
                      Serviço de Interesse / Mensagem
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border text-white focus:border-primary focus:outline-none transition-colors resize-none rounded-sm"
                      placeholder="Ex: Gostaria de orçar vitrificação para um SW4..."
                    />
                  </div>
                  <button
                    type="submit"
                    data-cta="form-contato"
                    className="inline-flex items-center justify-center gap-2 px-8 py-5 brand-gradient text-white font-heading text-lg uppercase tracking-wider hover:opacity-90 transition-opacity glow-brand shadow-lg"
                  >
                    Enviar Mensagem <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-secondary grayscale border-t border-border flex items-center justify-center italic text-muted-foreground">
        [Google Maps - Prime Detail Uberlândia]
      </section>
    </>
  );
};

export default Contato;
