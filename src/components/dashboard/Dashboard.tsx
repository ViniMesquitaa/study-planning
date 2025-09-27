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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-success/5 rounded-2xl" />
        <div className="relative bg-gradient-card border border-border/50 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              {/* Título corrigido - removendo gradiente problemático no dark mode */}
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Acompanhe seu progresso nos estudos
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Tempo hoje</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.round(todayStudyTime / 60)}h{" "}
                  {Math.round(todayStudyTime % 60)}min
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-gradient-card border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  {Math.round(todayStudyTime)}
                </p>
                <p className="text-sm text-muted-foreground">min</p>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Estudado hoje
            </h3>
            <p className="text-sm text-muted-foreground">
              {Math.round(todayStudyTime / 60)}h{" "}
              {Math.round(todayStudyTime % 60)}min
            </p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-gradient-card border border-success/20 rounded-2xl p-6 hover:border-success/40 transition-all duration-300 hover:shadow-lg hover:shadow-success/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-success-foreground" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  {activeSubjects}
                </p>
                <p className="text-sm text-muted-foreground">ativas</p>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Matérias</h3>
            <p className="text-sm text-muted-foreground">
              {totalSubjects} total
            </p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-gradient-card border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-500/80 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  {completedTopics}
                </p>
                <p className="text-sm text-muted-foreground">concluídos</p>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Tópicos</h3>
            <p className="text-sm text-muted-foreground">{totalTopics} total</p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-gradient-card border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-500/80 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  {Math.round(weekStudyTime)}
                </p>
                <p className="text-sm text-muted-foreground">min</p>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Esta semana</h3>
            <p className="text-sm text-muted-foreground">
              {Math.round(weekStudyTime / 60)}h total
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full group-hover:opacity-100 opacity-0 transition-opacity"
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
          {/* Gráfico de barras */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <Card className="relative bg-gradient-card border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Tempo estudado por matéria
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      Esta semana
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

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <Card className="relative bg-gradient-card border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Tópicos recentes
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal">
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
                        className="group/item flex items-center justify-between p-4 bg-gradient-to-r from-secondary/20 to-secondary/5 rounded-xl hover:from-secondary/30 hover:to-secondary/10 transition-all duration-200 hover:shadow-md border border-border/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-foreground">
                              {topic.topic}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {topic.subject}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              topic.completed
                                ? "bg-success shadow-lg shadow-success/50"
                                : "bg-muted-foreground/30"
                            }`}
                          />
                          {topic.completed && (
                            <CheckCircle className="w-4 h-4 text-success" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-12">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-medium text-foreground">
                        Nenhum tópico ainda
                      </p>
                      <p className="text-sm">
                        Crie sua primeira matéria para começar!
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  asChild
                >
                  <Link to="/subjects">Ver todas as matérias</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                Agenda de hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-foreground">
                      09:00 - Matemática
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Revisão de derivadas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-foreground">
                      14:00 - Física
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Leis de Newton
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-foreground">
                      16:00 - História
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Segunda Guerra Mundial
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver agenda completa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
