import { BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.svg";

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-secondary">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-inter text-foreground leading-tight">
                Organize seus{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  estudos
                </span>{" "}
                com eficiência
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Gerencie matérias, acompanhe seu progresso e use o método
                Pomodoro para maximizar seu desempenho acadêmico.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Matérias</p>
                  <p className="text-xs text-muted-foreground">Organizadas</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">Pomodoro</p>
                  <p className="text-xs text-muted-foreground">Integrado</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Metas</p>
                  <p className="text-xs text-muted-foreground">
                    Personalizadas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">Progresso</p>
                  <p className="text-xs text-muted-foreground">Visual</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/subjects">
                  <BookOpen className="w-4 h-4" />
                  Ver Matérias
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <Link to="/pomodoro">
                  <Clock className="w-4 h-4" />
                  Iniciar Pomodoro
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="StudyFlow - Organizador de estudos moderno"
                className="w-full h-auto animate-float-fade"
              />
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-success/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
