import { useState } from "react";
import { Plus } from "lucide-react";
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
import { useSubjectsStore } from "@/store/useSubjects";
import { SubjectForm } from "@/components/forms/SubjectForm";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import { BookOpen, Trash2 } from "lucide-react";

const SubjectsList = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjectsStore();
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<any>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (subject: any) => {
    setCurrentSubject(subject);
    setIsAddSubjectOpen(true);
  };

  const handleDelete = (id: string) => {
    setSubjectToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete);
      setIsDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handleAddSubject = () => {
    setCurrentSubject(null);
    setIsAddSubjectOpen(true);
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (currentSubject) {
        updateSubject(currentSubject.id, data);
      } else {
        addSubject(data);
      }
      setIsAddSubjectOpen(false);
    } catch (error) {
      console.error('Erro ao salvar matéria:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb 
        items={[
          { label: 'Matérias', icon: <BookOpen className="h-4 w-4" /> }
        ]} 
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-inter text-foreground">
            Matérias
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas disciplinas e tópicos de estudo
          </p>
        </div>

        <LoadingButton onClick={handleAddSubject} className="gap-2" loading={isLoading}>
          <Plus className="w-4 h-4" />
          Nova Matéria
        </LoadingButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onEdit={() => handleEdit(subject)}
            onDelete={() => handleDelete(subject.id)}
            onAddTopic={() => {}} // Não usado mais aqui
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentSubject ? "Editar Matéria" : "Nova Matéria"}
            </DialogTitle>
          </DialogHeader>
          <SubjectForm
            subject={currentSubject}
            onSubmit={handleSubmit}
            onCancel={() => setIsAddSubjectOpen(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>


      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Excluir Matéria"
        description="Tem certeza que deseja excluir esta matéria? Esta ação não pode ser desfeita. Todos os tópicos associados serão removidos."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
        icon={<Trash2 className="h-4 w-4" />}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SubjectsList;
