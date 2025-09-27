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
        {/* Seção Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-inter text-foreground leading-tight">
                    Transforme sua{" "}
                    <span className="text-primary dark:text-primary-light">
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
                  className="w-full animate-float-fade h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção Features */}
        <section className="py-20 bg-white dark:bg-gray-900">
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
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Organize Matérias
                </h3>
                <p className="text-muted-foreground">
                  Categorize por disciplina, adicione tópicos e acompanhe seu
                  progresso.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Pomodoro Integrado
                </h3>
                <p className="text-muted-foreground">
                  Técnica comprovada para melhorar foco e produtividade.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Metas Personalizadas
                </h3>
                <p className="text-muted-foreground">
                  Defina objetivos semanais e receba recomendações inteligentes.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Acompanhe Progresso
                </h3>
                <p className="text-muted-foreground">
                  Gráficos e relatórios para visualizar sua evolução.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção CTA */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
    </div>
  );
};

export default PublicLandingPage;
