import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Resultados from "./pages/Resultados";
import Glossario from "./pages/Glossario";
import Guia from "./pages/Guia";
import Blog from "./pages/Blog";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Service Detail Pages
import LavagemDetalhada from "./pages/servicos/LavagemDetalhada";
import PolimentoTecnico from "./pages/servicos/PolimentoTecnico";
import VitrificacaoPintura from "./pages/servicos/VitrificacaoPintura";
import PeliculaControleSolar from "./pages/servicos/PeliculaControleSolar";
import PPFProtecao from "./pages/servicos/PPFProtecao";
import HigienizacaoInterna from "./pages/servicos/HigienizacaoInterna";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/servicos" element={<Servicos />} />

            {/* Service Detail Routes */}
            <Route path="/servicos/lavagem-detalhada" element={<LavagemDetalhada />} />
            <Route path="/servicos/polimento-tecnico" element={<PolimentoTecnico />} />
            <Route path="/servicos/vitrificacao-pintura" element={<VitrificacaoPintura />} />
            <Route path="/servicos/pelicula-controle-solar" element={<PeliculaControleSolar />} />
            <Route path="/servicos/ppf-protecao-pintura" element={<PPFProtecao />} />
            <Route path="/servicos/higienizacao-interna" element={<HigienizacaoInterna />} />

            <Route path="/resultados" element={<Resultados />} />
            <Route path="/glossario" element={<Glossario />} />
            <Route path="/guia-cuidados" element={<Guia />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
