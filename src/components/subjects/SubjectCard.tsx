import {
  BookOpen,
  Clock,
  Target,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  lastReview?: Date;
}

interface Subject {
  id: string;
  name: string;
  color: string;
  totalTopics: number;
  completedTopics: number;
  weeklyGoal: number;
  currentWeekStudied: number;
  topics: Topic[];
}

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: {
    id: string;
    name: string;
    color: string;
    weeklyGoal: number;
  }) => void;
  onDelete: (id: string) => void;
  onAddTopic: (subjectId: string) => void;
}

const SubjectCard = ({
  subject,
  onEdit,
  onDelete,
  onAddTopic,
}: SubjectCardProps) => {
  const completionPercentage =
    subject.totalTopics > 0
      ? Math.round((subject.completedTopics / subject.totalTopics) * 100)
      : 0;

  const weeklyProgress =
    subject.weeklyGoal > 0
      ? Math.round((subject.currentWeekStudied / subject.weeklyGoal) * 100)
      : 0;

  return (
    <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-8 rounded-full"
              style={{ backgroundColor: subject.color }}
            />
            <div>
              <h3 className="font-semibold font-inter text-foreground">
                {subject.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {subject.completedTopics} de {subject.totalTopics} tópicos
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(subject)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(subject.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso geral</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Meta semanal</span>
            <span className="font-medium">
              {subject.currentWeekStudied.toFixed(1)}h / {subject.weeklyGoal}h
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div
              className={`rounded-full h-1.5 transition-all duration-300 ${
                weeklyProgress >= 100 ? "bg-success" : "bg-primary"
              }`}
              style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{subject.totalTopics}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>{subject.completedTopics}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{subject.currentWeekStudied.toFixed(1)}h</span>
            </div>
          </div>

          <div className="flex gap-2 ">
            <Button asChild variant="default" size="sm" className="">
              <Link to={`/subjects/${subject.id}`}>Entrar</Link>
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-end">
          {weeklyProgress >= 100 ? (
            <Badge
              variant="secondary"
              className="bg-success-light text-success"
            >
              Meta atingida! 🎉
            </Badge>
          ) : weeklyProgress >= 70 ? (
            <Badge
              variant="secondary"
              className="bg-primary-light text-primary"
            >
              Quase lá! 💪
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Continue assim! 📚
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
