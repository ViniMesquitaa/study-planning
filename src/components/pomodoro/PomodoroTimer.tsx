import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TimerMode = "work" | "break";
type TimerStatus = "idle" | "running" | "paused";

const PomodoroTimer = () => {
  // Tempos padrão (em minutos)
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  // Estados do timer
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [sessions, setSessions] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
  }, [mode, workMinutes, breakMinutes, toast]);

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

  return (
    <Card className="bg-gradient-card shadow-lg">
      <CardHeader className="text-center relative">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          {mode === "work" ? (
            <>
              <Play className="w-5 h-5 text-primary" />
              Sessão de Estudo
            </>
          ) : (
            <>
              <Coffee className="w-5 h-5 text-success" />
              Intervalo
            </>
          )}
        </CardTitle>
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
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={
                mode === "work" ? "hsl(var(--primary))" : "hsl(var(--success))"
              }
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold font-inter">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={handlePlayPause}
            variant={status === "running" ? "secondary" : "default"}
            size="lg"
            className="gap-2"
          >
            {status === "running" ? (
              <>
                <Pause className="w-4 h-4" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {status === "paused" ? "Continuar" : "Iniciar"}
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Sessões completadas hoje
          </p>
          <p className="text-2xl font-bold font-inter text-primary">
            {sessions}
          </p>
        </div>

        <Button
          onClick={switchMode}
          variant="ghost"
          className="w-full gap-2 text-muted-foreground hover:text-foreground"
        >
          {mode === "work" ? (
            <>
              <Coffee className="w-4 h-4" />
              Mudar para intervalo
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Mudar para estudo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
