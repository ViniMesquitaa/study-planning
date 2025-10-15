import { BookOpen, Clock, Target, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.svg";
import Header from "../layout/Header";

const PublicLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isPublic={true} />
      {/* Conteúdo principal */}
      <main className="flex-1">
        {/* Seção Hero - Minimalista e Moderna */}
        <section className="relative overflow-hidden bg-background">
          <div className="container mx-auto py-20 lg:py-32 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                    Transforme sua{" "}
                    <span className="text-primary">
                      rotina de estudos
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Organize matérias, gerencie seu tempo com Pomodoro e alcance
                    seus objetivos acadêmicos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    asChild
                  >
                    <Link to="/register">
                      Começar agora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <Link to="/login">Fazer login</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={heroImage}
                  alt="Study Planning"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção Features */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Tudo que você precisa
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ferramentas completas para otimizar seus estudos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Organize Matérias
                </h3>
                <p className="text-sm text-muted-foreground">
                  Categorize por disciplina, adicione tópicos e acompanhe seu progresso.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Pomodoro Integrado
                </h3>
                <p className="text-sm text-muted-foreground">
                  Técnica comprovada para melhorar foco e produtividade.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Metas Personalizadas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Defina objetivos semanais e acompanhe seu desempenho.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Acompanhe Progresso
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gráficos e relatórios detalhados para visualizar sua evolução.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto text-center px-4">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Pronto para transformar seus estudos?
              </h2>
              <p className="text-lg text-white/90">
                Cadastre-se gratuitamente e comece a otimizar seu aprendizado hoje mesmo.
              </p>

              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link to="/register">
                  Criar minha conta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicLandingPage;
