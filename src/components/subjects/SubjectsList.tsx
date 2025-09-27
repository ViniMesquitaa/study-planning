import { useState } from "react";
import { Plus, X } from "lucide-react";
import SubjectCard from "./SubjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "../../lib/ColorPicker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Topic = {
  id: string;
  name: string;
  completed: boolean;
};

type Subject = {
  id: string;
  name: string;
  color: string;
  totalTopics: number;
  completedTopics: number;
  weeklyGoal: number;
  currentWeekStudied: number;
  topics: Topic[];
};

const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Matemática",
    color: "#3b82f6",
    totalTopics: 15,
    completedTopics: 8,
    weeklyGoal: 8,
    currentWeekStudied: 6.5,
    topics: [
      { id: "1", name: "Derivadas", completed: true },
      { id: "2", name: "Integrais", completed: false },
      { id: "3", name: "Limites", completed: true },
    ],
  },
  {
    id: "2",
    name: "Física",
    color: "#10b981",
    totalTopics: 12,
    completedTopics: 10,
    weeklyGoal: 6,
    currentWeekStudied: 7.2,
    topics: [
      { id: "4", name: "Leis de Newton", completed: true },
      { id: "5", name: "Termodinâmica", completed: true },
    ],
  },
  {
    id: "3",
    name: "Química",
    color: "#f59e0b",
    totalTopics: 10,
    completedTopics: 4,
    weeklyGoal: 5,
    currentWeekStudied: 2.8,
    topics: [
      { id: "6", name: "Tabela Periódica", completed: false },
      { id: "7", name: "Ligações Químicas", completed: true },
    ],
  },
  {
    id: "4",
    name: "História",
    color: "#8b5cf6",
    totalTopics: 8,
    completedTopics: 3,
    weeklyGoal: 4,
    currentWeekStudied: 1.5,
    topics: [
      { id: "8", name: "Segunda Guerra Mundial", completed: false },
      { id: "9", name: "Revolução Industrial", completed: true },
    ],
  },
];

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const [subjectName, setSubjectName] = useState("");
  const [subjectColor, setSubjectColor] = useState("#3b82f6");
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [topicName, setTopicName] = useState("");

  const handleEdit = (subject: Subject) => {
    setCurrentSubject(subject);
    setSubjectName(subject.name);
    setSubjectColor(subject.color);
    setWeeklyGoal(subject.weeklyGoal);
    setIsAddSubjectOpen(true);
  };

  const handleDelete = (id: string) => {
    setSubjectToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      setSubjects(subjects.filter((subject) => subject.id !== subjectToDelete));
      setIsDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handleAddTopic = (subject: Subject) => {
    setCurrentSubject(subject);
    setIsAddTopicOpen(true);
  };

  const handleAddSubject = () => {
    setCurrentSubject(null);
    setSubjectName("");
    setSubjectColor("#3b82f6");
    setWeeklyGoal(5);
    setIsAddSubjectOpen(true);
  };

  const saveSubject = () => {
    if (!subjectName.trim()) return;

    if (currentSubject) {
      const updatedSubjects = subjects.map((subject) =>
        subject.id === currentSubject.id
          ? {
              ...subject,
              name: subjectName,
              color: subjectColor,
              weeklyGoal: weeklyGoal,
            }
          : subject
      );
      setSubjects(updatedSubjects);
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: subjectName,
        color: subjectColor,
        totalTopics: 0,
        completedTopics: 0,
        weeklyGoal: weeklyGoal,
        currentWeekStudied: 0,
        topics: [],
      };
      setSubjects([...subjects, newSubject]);
    }
    setIsAddSubjectOpen(false);
  };

  const saveTopic = () => {
    if (!topicName.trim() || !currentSubject) return;

    const newTopic: Topic = {
      id: Date.now().toString(),
      name: topicName,
      completed: false,
    };

    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === currentSubject.id) {
        return {
          ...subject,
          topics: [...subject.topics, newTopic],
          totalTopics: subject.totalTopics + 1,
        };
      }
      return subject;
    });

    setSubjects(updatedSubjects);
    setTopicName("");
    setIsAddTopicOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-inter text-foreground">
            Matérias
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas disciplinas e tópicos de estudo
          </p>
        </div>

        <Button onClick={handleAddSubject} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Matéria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onEdit={() => handleEdit(subject)}
            onDelete={() => handleDelete(subject.id)}
            onAddTopic={() => handleAddTopic(subject)}
          />
        ))}

        <Card
          onClick={handleAddSubject}
          className="bg-gradient-secondary border-2 border-dashed border-primary/30 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group"
        >
          <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium font-inter text-foreground">
                Adicionar Matéria
              </h3>
              <p className="text-sm text-muted-foreground">
                Clique para criar uma nova disciplina
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentSubject ? "Editar Matéria" : "Nova Matéria"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subjectName">Nome da Matéria</Label>
              <Input
                id="subjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Ex: Matemática"
              />
            </div>
            <div>
              <Label htmlFor="weeklyGoal">Meta Semanal (horas)</Label>
              <Input
                id="weeklyGoal"
                type="number"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label>Cor</Label>
              <ColorPicker color={subjectColor} onChange={setSubjectColor} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddSubjectOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={saveSubject}>
                {currentSubject ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Adicionar Tópico em {currentSubject?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topicName">Nome do Tópico</Label>
              <Input
                id="topicName"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Ex: Derivadas"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddTopicOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={saveTopic}>Adicionar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir esta matéria?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todos os tópicos associados serão
              removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubjectsList;
