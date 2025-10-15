import {
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "./StatsCard";
import PomodoroTimer from "../pomodoro/PomodoroTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "../footer/Footer";
import { useSubjectsStore } from "@/store/useSubjects";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { subjects, getTodayStudyTime, getWeekStudyTime, resetWeeklyProgress } =
    useSubjectsStore();

  // Calcular estatísticas
  const todayStudyTime = getTodayStudyTime();
  const weekStudyTime = getWeekStudyTime();
  const totalSubjects = subjects.length;
  const activeSubjects = subjects.filter(
    (subject) => subject.topics.length > 0
  ).length;
  const totalTopics = subjects.reduce(
    (acc, subject) => acc + subject.totalTopics,
    0
  );
  const completedTopics = subjects.reduce(
    (acc, subject) => acc + subject.completedTopics,
    0
  );

  // Tópicos recentes (últimos 5)
  const recentTopics = subjects
    .flatMap((subject) =>
      subject.topics.map((topic) => ({
        id: topic.id,
        subject: subject.name,
        topic: topic.name,
        completed: topic.completed,
        updatedAt: topic.updatedAt,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  // Dados para o gráfico de barras (minutos por matéria hoje)
  const chartData = subjects
    .map((subject) => ({
      name: subject.name,
      minutes: Math.round(subject.currentWeekStudied * 60), // converter horas para minutos
      color: subject.color,
    }))
    .filter((item) => item.minutes > 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section - Modernizado e Profissional */}
      <div className="relative animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 rounded-3xl blur-3xl opacity-60" />
        <div className="relative card-gradient shadow-2xl rounded-3xl p-8 lg:p-10 transition-smooth hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border border-border/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-12 bg-gradient-primary rounded-full" />
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                  Dashboard
                </h1>
              </div>
              <p className="text-lg text-muted-foreground pl-5">
                Acompanhe seu progresso e alcance suas metas
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-6 border border-primary/20">
              <div className="text-right space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Tempo hoje</p>
                <p className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {Math.round(todayStudyTime / 60)}h {Math.round(todayStudyTime % 60)}min
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Clock className="w-10 h-10 text-white animate-pulse-soft" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Modernizado e Profissional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 animate-slide-in-bottom">
        {/* Card 1: Estudado Hoje */}
        <div className="group relative animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" />
          <div className="relative card-gradient border-2 border-primary/20 rounded-3xl p-6 lg:p-7 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-foreground tabular-nums">
                  {Math.round(todayStudyTime)}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">min</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-foreground text-lg leading-tight">
                Estudado hoje
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {Math.round(todayStudyTime / 60)}h {Math.round(todayStudyTime % 60)}min de foco total
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Matérias */}
        <div className="group relative animate-scale-in" style={{animationDelay: "0.1s"}}>
          <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" />
          <div className="relative card-gradient border-2 border-success/20 rounded-3xl p-6 lg:p-7 hover:border-success/40 transition-all duration-300 hover:shadow-2xl hover:shadow-success/20 hover:-translate-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-success flex items-center justify-center shadow-lg shadow-success/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-foreground tabular-nums">
                  {activeSubjects}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">ativas</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-foreground text-lg leading-tight">Matérias</h3>
              <p className="text-sm text-muted-foreground font-medium">
                {totalSubjects} disciplinas cadastradas
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Tópicos */}
        <div className="group relative animate-scale-in" style={{animationDelay: "0.2s"}}>
          <div className="absolute inset-0 bg-gradient-to-br from-warning/20 to-warning/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" />
          <div className="relative card-gradient border-2 border-warning/20 rounded-3xl p-6 lg:p-7 hover:border-warning/40 transition-all duration-300 hover:shadow-2xl hover:shadow-warning/20 hover:-translate-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-warning flex items-center justify-center shadow-lg shadow-warning/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-foreground tabular-nums">
                  {completedTopics}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">concluídos</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-foreground text-lg leading-tight">Tópicos</h3>
              <p className="text-sm text-muted-foreground font-medium">{totalTopics} tópicos no total</p>
            </div>
          </div>
        </div>

        {/* Card 4: Esta Semana */}
        <div className="group relative animate-scale-in" style={{animationDelay: "0.3s"}}>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" />
          <div className="relative card-gradient border-2 border-accent/20 rounded-3xl p-6 lg:p-7 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-foreground tabular-nums">
                  {Math.round(weekStudyTime)}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">min</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-foreground text-lg leading-tight">Esta semana</h3>
              <p className="text-sm text-muted-foreground font-medium">
                {Math.round(weekStudyTime / 60)}h de estudo total
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent/20 hover:scale-110"
              onClick={() => resetWeeklyProgress()}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Gráfico de barras - Modernizado */}
          <div className="group relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-success/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <Card className="relative card-gradient border-2 border-border/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-4 text-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">
                      Tempo estudado por matéria
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Progresso semanal
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {chartData.length > 0 ? (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.3}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="name"
                          tick={{
                            fontSize: 12,
                            fill: "hsl(var(--muted-foreground))",
                          }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                        />
                        <YAxis
                          tick={{
                            fontSize: 12,
                            fill: "hsl(var(--muted-foreground))",
                          }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value: number) => [
                            `${value} min`,
                            "Tempo estudado",
                          ]}
                          labelFormatter={(label) => `Matéria: ${label}`}
                        />
                        <Bar
                          dataKey="minutes"
                          fill="url(#colorGradient)"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-72 flex flex-col items-center justify-center text-muted-foreground">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium text-foreground">
                      Nenhum dado de estudo ainda
                    </p>
                    <p className="text-sm">
                      Comece estudando para ver seu progresso!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tópicos Recentes - Modernizado */}
          <div className="group relative animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-accent/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <Card className="relative card-gradient border-2 border-border/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-success/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-4 text-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">
                      Tópicos recentes
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Últimas atividades
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {recentTopics.length > 0 ? (
                    recentTopics.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="group/item flex items-center justify-between p-4 bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-xl hover:from-secondary/50 hover:to-secondary/20 transition-all duration-300 hover:shadow-lg border border-border/50 hover:border-primary/30"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-sm font-bold text-white shadow-md">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-foreground text-base">
                              {topic.topic}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                              {topic.subject}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                              topic.completed
                                ? "bg-success shadow-lg shadow-success/50 scale-110"
                                : "bg-muted-foreground/40"
                            }`}
                          />
                          {topic.completed && (
                            <CheckCircle className="w-5 h-5 text-success animate-scale-in" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-16">
                      <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <p className="text-xl font-bold text-foreground mb-2">
                        Nenhum tópico ainda
                      </p>
                      <p className="text-sm">
                        Crie sua primeira matéria e comece a estudar!
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 bg-primary/5 border-primary/30 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-semibold"
                  asChild
                >
                  <Link to="/subjects">Ver todas as matérias →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Agenda - Modernizada */}
          <Card className="card-gradient border-2 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-info to-info/80 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Agenda de hoje</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    Suas próximas sessões
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/15 transition-all duration-300">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shadow-lg shadow-primary/50" />
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-sm text-foreground">
                      09:00 - Matemática
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Revisão de derivadas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-success/10 rounded-xl border border-success/20 hover:bg-success/15 transition-all duration-300">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 shadow-lg shadow-success/50" />
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-sm text-foreground">
                      14:00 - Física
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Leis de Newton
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl border border-accent/20 hover:bg-accent/15 transition-all duration-300">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 shadow-lg shadow-accent/50" />
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-sm text-foreground">
                      16:00 - História
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Segunda Guerra Mundial
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 hover:bg-info/10 hover:border-info/30 hover:text-info font-semibold transition-all duration-300">
                Ver agenda completa →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
