import Header from "@/components/layout/Header";
import PomodoroTimer from "@/components/pomodoro/PomodoroTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BarChart3, Trophy } from "lucide-react";

const Pomodoro = () => {
  const stats = {
    todaySessions: 8,
    todayMinutes: 200,
    weekSessions: 35,
    weekMinutes: 875,
    monthSessions: 142,
    monthMinutes: 3550,
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="container mx-auto py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-inter text-foreground mb-2">
              Timer Pomodoro
            </h2>
            <p className="text-muted-foreground">
              Mantenha o foco com sessões de 25 minutos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <PomodoroTimer />
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary-light rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Hoje</p>
                        <p className="text-xs text-muted-foreground">
                          {stats.todayMinutes} minutos
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        {stats.todaySessions}
                      </p>
                      <p className="text-xs text-muted-foreground">sessões</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Esta semana</p>
                        <p className="text-xs text-muted-foreground">
                          {stats.weekMinutes} minutos
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-success">
                        {stats.weekSessions}
                      </p>
                      <p className="text-xs text-muted-foreground">sessões</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Este mês</p>
                        <p className="text-xs text-muted-foreground">
                          {stats.monthMinutes} minutos
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        {stats.monthSessions}
                      </p>
                      <p className="text-xs text-muted-foreground">sessões</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Dicas do Método Pomodoro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p>Foque completamente na tarefa por 25 minutos</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <p>Faça uma pausa de 5 minutos entre as sessões</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p>
                        Após 4 sessões, faça uma pausa mais longa (15-30 min)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <p>Evite interrupções durante as sessões</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pomodoro;
