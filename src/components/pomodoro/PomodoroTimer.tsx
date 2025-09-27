import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Settings, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSubjectsStore } from "@/store/useSubjects";

type TimerMode = "work" | "break";
type TimerStatus = "idle" | "running" | "paused";

const PomodoroTimer = () => {
  const { subjects, addStudySession } = useSubjectsStore();
  
  // Tempos padrão (em minutos)
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  // Estados do timer
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [sessions, setSessions] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const { toast } = useToast();

  // Atualiza o tempo quando os minutos são alterados
  useEffect(() => {
    setTimeLeft(mode === "work" ? workMinutes * 60 : breakMinutes * 60);
  }, [workMinutes, breakMinutes, mode]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(mode === "work" ? workMinutes * 60 : breakMinutes * 60);
    setStatus("idle");
  }, [mode, workMinutes, breakMinutes]);

  const switchMode = useCallback(() => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setTimeLeft(newMode === "work" ? workMinutes * 60 : breakMinutes * 60);
    setStatus("idle");

    if (newMode === "break") {
      setSessions((prev) => prev + 1);
      
      // Salvar sessão de estudo se uma matéria foi selecionada
      if (selectedSubjectId && mode === "work") {
        addStudySession({
          subjectId: selectedSubjectId,
          topicId: selectedTopicId && selectedTopicId !== "none" ? selectedTopicId : undefined,
          duration: workMinutes,
          type: 'pomodoro'
        });
      }
      
      toast({
        title: "Sessão concluída! 🎉",
        description: "Hora de fazer uma pausa merecida.",
      });
    } else {
      toast({
        title: "Pausa finalizada! 💪",
        description: "Vamos voltar aos estudos!",
      });
    }
  }, [mode, workMinutes, breakMinutes, selectedSubjectId, selectedTopicId, addStudySession, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "running" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      switchMode();
    }

    return () => clearInterval(interval);
  }, [status, timeLeft, switchMode]);

  const handlePlayPause = () => {
    setStatus(status === "running" ? "paused" : "running");
  };

  const handleReset = () => {
    resetTimer();
  };

  const handleSaveSettings = () => {
    resetTimer();
    setIsSettingsOpen(false);
    toast({
      title: "Configurações salvas!",
      description: "Os tempos foram atualizados.",
    });
  };

  const progress =
    (((mode === "work" ? workMinutes * 60 : breakMinutes * 60) - timeLeft) /
      (mode === "work" ? workMinutes * 60 : breakMinutes * 60)) *
    100;

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const availableTopics = selectedSubject?.topics || [];

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-success/10 to-primary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
      <Card className="relative bg-gradient-card border border-border/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
        <CardHeader className="text-center relative pb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                mode === "work" 
                  ? "bg-gradient-to-br from-primary to-primary/80" 
                  : "bg-gradient-to-br from-success to-success/80"
              }`}>
                {mode === "work" ? (
                  <Play className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Coffee className="w-6 h-6 text-success-foreground" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {mode === "work" ? "Sessão de Estudo" : "Intervalo"}
              </CardTitle>
            </div>
            <p className="text-muted-foreground">
              {mode === "work" ? "Foque no seu objetivo" : "Relaxe e recarregue"}
            </p>
          </div>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configurações do Timer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="work-time">Tempo de Estudo (minutos)</Label>
                <Input
                  id="work-time"
                  type="number"
                  min="1"
                  max="120"
                  value={workMinutes}
                  onChange={(e) => setWorkMinutes(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="break-time">Tempo de Descanso (minutos)</Label>
                <Input
                  id="break-time"
                  type="number"
                  min="1"
                  max="30"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="break-time">Sessões</Label>
                <Input
                  id="break-time"
                  type="number"
                  min={0}
                  max={100}
                  value={sessions}
                  onChange={(e) => setSessions(Number(e.target.value))}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveSettings}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Seleção de matéria e tópico */}
        {mode === "work" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject-select">Matéria</Label>
              <Select value={selectedSubjectId} onValueChange={(value) => {
                setSelectedSubjectId(value);
                setSelectedTopicId(""); // Reset tópico quando mudar matéria
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma matéria" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        {subject.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedSubject && availableTopics.length > 0 && (
              <div>
                <Label htmlFor="topic-select">Tópico (opcional)</Label>
                <Select value={selectedTopicId} onValueChange={setSelectedTopicId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tópico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum tópico específico</SelectItem>
                    {availableTopics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        <div className="relative flex items-center justify-center my-8">
          <div className="relative">
            {/* Background circle */}
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="6"
                opacity="0.3"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  mode === "work" ? "hsl(var(--primary))" : "hsl(var(--success))"
                }
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 8px ${
                    mode === "work" ? "hsl(var(--primary))" : "hsl(var(--success))"
                  })`
                }}
              />
            </svg>
            
            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-inter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {formatTime(timeLeft)}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  mode === "work" ? "bg-primary" : "bg-success"
                }`} />
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% concluído
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={handlePlayPause}
            size="lg"
            className={`gap-3 px-8 py-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 ${
              status === "running" 
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl" 
                : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl"
            }`}
          >
            {status === "running" ? (
              <>
                <Pause className="w-5 h-5" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {status === "paused" ? "Continuar" : "Iniciar"}
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="gap-3 px-6 py-3 rounded-2xl font-semibold border-2 hover:bg-muted/50 transition-all duration-200 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>

        <div className="bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-2xl p-6 mb-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Sessões completadas hoje
              </p>
            </div>
            <p className="text-3xl font-bold font-inter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {sessions}
            </p>
          </div>
        </div>

        <Button
          onClick={switchMode}
          variant="outline"
          className="w-full gap-3 py-3 rounded-2xl font-semibold border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-success/10 transition-all duration-200 hover:scale-[1.02]"
        >
          {mode === "work" ? (
            <>
              <Coffee className="w-5 h-5 text-success" />
              Mudar para intervalo
            </>
          ) : (
            <>
              <Play className="w-5 h-5 text-primary" />
              Mudar para estudo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};

export default PomodoroTimer;
