import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, FileText, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import SEOHead from '@/components/SEOHead';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  updated_at: string;
}

type Tab = 'pages' | 'blog';

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('pages');
  const [pages, setPages] = useState<Page[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string> | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', excerpt: '', status: 'draft' });

  const fetchData = async () => {
    setLoading(true);
    const [pagesRes, postsRes] = await Promise.all([
      supabase.from('pages').select('*').order('updated_at', { ascending: false }),
      supabase.from('blog_posts').select('*').order('updated_at', { ascending: false }),
    ]);
    setPages(pagesRes.data || []);
    setPosts(postsRes.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setFormData({ title: '', slug: '', content: '', excerpt: '', status: 'draft' });
    setModalOpen(true);
  };

  const openEdit = async (id: string) => {
    const table = tab === 'pages' ? 'pages' : 'blog_posts';
    const { data } = await supabase.from(table).select('*').eq('id', id).single();
    if (data) {
      setEditItem(data);
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        status: data.status || 'draft',
      });
      setModalOpen(true);
    }
  };

  const handleSave = async () => {
    const table = tab === 'pages' ? 'pages' : 'blog_posts';
    const payload: Record<string, unknown> = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      content: formData.content,
      status: formData.status,
    };
    if (tab === 'blog') {
      payload.excerpt = formData.excerpt;
      if (formData.status === 'published' && !editItem?.published_at) {
        payload.published_at = new Date().toISOString();
      }
    }

    if (editItem) {
      await supabase.from(table).update(payload).eq('id', editItem.id);
    } else {
      await supabase.from(table).insert(payload);
    }
    setModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    const table = tab === 'pages' ? 'pages' : 'blog_posts';
    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  const items = tab === 'pages' ? pages : posts;

  return (
    <>
      <SEOHead title="Admin" description="Painel administrativo SpeedAuto" />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading">
                Painel <span className="text-gradient-racing">Admin</span>
              </h1>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 transition-colors font-condensed uppercase tracking-wider"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 border-b border-border">
            {[
              { key: 'pages' as Tab, label: 'Páginas', icon: FileText },
              { key: 'blog' as Tab, label: 'Blog Posts', icon: BookOpen },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-6 py-3 font-condensed text-sm uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                  tab === t.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="mb-6">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-6 py-3 racing-gradient text-primary-foreground font-condensed uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> Novo {tab === 'pages' ? 'Página' : 'Post'}
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-card border border-border animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Nenhum item cadastrado.</p>
          ) : (
            <div className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-left px-6 py-3 font-condensed text-xs uppercase tracking-wider text-muted-foreground">Título</th>
                      <th className="text-left px-6 py-3 font-condensed text-xs uppercase tracking-wider text-muted-foreground">Slug</th>
                      <th className="text-left px-6 py-3 font-condensed text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="text-right px-6 py-3 font-condensed text-xs uppercase tracking-wider text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4 text-sm">{item.title}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{item.slug}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 text-xs font-condensed uppercase tracking-wider ${
                            item.status === 'published'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(item.id)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-card border border-border p-8 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-heading mb-6">
              {editItem ? 'Editar' : 'Criar'} {tab === 'pages' ? 'Página' : 'Post'}
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">Título</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">Slug</label>
                <input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="gerado-automaticamente"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              {tab === 'blog' && (
                <div>
                  <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">Resumo</label>
                  <input
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">Conteúdo</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block font-condensed text-sm uppercase tracking-wider text-muted-foreground mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 racing-gradient text-primary-foreground font-condensed uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 border border-border text-muted-foreground font-condensed uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
