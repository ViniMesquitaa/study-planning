import {
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "./StatsCard";
import PomodoroTimer from "../pomodoro/PomodoroTimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data - em um app real, viria da API
  const recentTopics = [
    { id: 1, subject: "Matemática", topic: "Derivadas", completed: true },
    {
      id: 2,
      subject: "História",
      topic: "Segunda Guerra Mundial",
      completed: false,
    },
    { id: 3, subject: "Física", topic: "Leis de Newton", completed: true },
    { id: 4, subject: "Química", topic: "Tabela Periódica", completed: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-inter text-foreground mb-2">
          Dashboard
        </h2>
        <p className="text-muted-foreground">
          Acompanhe seu progresso nos estudos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Horas estudadas hoje"
          value="3.5h"
          icon={<Clock className="w-4 h-4" />}
          description="Meta: 4h diárias"
          trend="+12% essa semana"
        />

        <StatsCard
          title="Matérias ativas"
          value="6"
          icon={<BookOpen className="w-4 h-4" />}
          description="4 em andamento"
        />

        <StatsCard
          title="Tópicos concluídos"
          value="24"
          icon={<Target className="w-4 h-4" />}
          description="Este mês"
          trend="+8 esta semana"
        />

        <StatsCard
          title="Sequência"
          value="7 dias"
          icon={<TrendingUp className="w-4 h-4" />}
          description="Estudando diariamente"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                Tópicos recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm text-foreground">
                        {topic.topic}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {topic.subject}
                      </p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        topic.completed
                          ? "bg-success"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/subjects">Ver todas as matérias</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                Agenda de hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary-light rounded-lg">
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

                <div className="flex items-center gap-3 p-3 bg-success-light rounded-lg">
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

                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
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
