import { BookOpen, Clock, Target, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.svg";

const PublicLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="./logo.png" alt="" className="h-8" />
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login" className="flex items-center gap-2">
                Fazer Login <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1">
        {/* Seção Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-inter text-foreground leading-tight">
                    Transforme sua{" "}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      rotina de estudos
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Organize matérias, gerencie seu tempo com Pomodoro e alcance
                    seus objetivos acadêmicos com nossa plataforma inteligente.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="gap-2" asChild>
                    <Link to="/register">
                      Começar Agora
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <Link to="/login">Já tem uma conta? Login</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={heroImage}
                  alt="StudyFlow - Organizador de estudos moderno"
                  className="w-full h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Como podemos te ajudar
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Tudo que você precisa para otimizar seus estudos em uma única
                plataforma
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Organize Matérias
                </h3>
                <p className="text-muted-foreground">
                  Categorize por disciplina, adicione tópicos e acompanhe seu
                  progresso.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Pomodoro Integrado
                </h3>
                <p className="text-muted-foreground">
                  Técnica comprovada para melhorar foco e produtividade.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Metas Personalizadas
                </h3>
                <p className="text-muted-foreground">
                  Defina objetivos semanais e receba recomendações inteligentes.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Acompanhe Progresso
                </h3>
                <p className="text-muted-foreground">
                  Gráficos e relatórios para visualizar sua evolução.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Pronto para transformar seus estudos?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Cadastre-se gratuitamente e comece a otimizar seu aprendizado hoje
              mesmo.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <Link to="/register">
                Criar Minha Conta <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  CodeLine
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Organize, estude, conquiste.
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Termos
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacidade
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLandingPage;
