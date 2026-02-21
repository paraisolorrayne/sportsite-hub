import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Contato = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with Supabase or email service
    setSent(true);
  };

  return (
    <>
      <SEOHead
        title="Contato"
        description="Entre em contato com a SpeedAuto. Agende seu horário ou tire suas dúvidas sobre nossos serviços de estética automotiva."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="h-1 w-16 racing-gradient mb-6" />
            <h1 className="text-4xl md:text-6xl font-heading mb-4">
              <span className="text-gradient-racing">Contato</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {sent ? (
                <div className="p-8 bg-card border border-primary/30 text-center">
                  <h3 className="font-heading text-2xl text-primary mb-2">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">Entraremos em contato em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {[
                    { name: 'name', label: 'Nome', type: 'text' },
                    { name: 'email', label: 'E-mail', type: 'email' },
                    { name: 'phone', label: 'Telefone', type: 'tel' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">
                      Mensagem
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 racing-gradient text-primary-foreground font-condensed uppercase tracking-wider hover:opacity-90 transition-opacity glow-primary"
                  >
                    Enviar <Send size={16} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              {[
                { icon: MapPin, label: 'Endereço', value: 'Rua das Velocidades, 1000 - São Paulo, SP' },
                { icon: Phone, label: 'Telefone', value: '(11) 99999-9999' },
                { icon: Mail, label: 'E-mail', value: 'contato@speedauto.com.br' },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4 p-6 bg-card border border-border">
                  <info.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-1">
                      {info.label}
                    </h3>
                    <p className="text-foreground">{info.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contato;
