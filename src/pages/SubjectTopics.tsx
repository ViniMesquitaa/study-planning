import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { useSubjectsStore } from '@/store/useSubjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, CheckCircle, Circle, Edit, Trash2, Clock, Target, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TopicForm } from '@/components/forms/TopicForm';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { LoadingButton } from '@/components/ui/loading-button';

const SubjectTopics = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { getSubjectById, addTopic, updateTopic, deleteTopic, toggleTopicCompletion } = useSubjectsStore();
  
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isEditTopicOpen, setIsEditTopicOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<any>(null);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subject = subjectId ? getSubjectById(subjectId) : null;

  if (!subject) {
    return (
      <div className="min-h-screen bg-background font-inter">
        <Header />
        <main className="container mx-auto py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Matéria não encontrada</h2>
            <Button asChild>
              <Link to="/subjects">Voltar para matérias</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleAddTopic = () => {
    setCurrentTopic(null);
    setIsAddTopicOpen(true);
  };

  const handleEditTopic = (topic: any) => {
    setCurrentTopic(topic);
    setIsEditTopicOpen(true);
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (currentTopic) {
        updateTopic(subjectId!, currentTopic.id, data);
        setIsEditTopicOpen(false);
      } else {
        addTopic(subjectId!, data);
        setIsAddTopicOpen(false);
      }
    } catch (error) {
      console.error('Erro ao salvar tópico:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTopic = (topicId: string) => {
    setTopicToDelete(topicId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (topicToDelete) {
      deleteTopic(subjectId!, topicToDelete);
      setIsDeleteDialogOpen(false);
      setTopicToDelete(null);
    }
  };

  const handleToggleCompletion = (topicId: string) => {
    toggleTopicCompletion(subjectId!, topicId);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="container mx-auto py-8">
        <div className="space-y-6">
          <Breadcrumb 
            items={[
              { label: 'Matérias', href: '/subjects', icon: <BookOpen className="h-4 w-4" /> },
              { label: subject.name, icon: <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} /> }
            ]} 
          />
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/subjects">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground" style={{ color: subject.color }}>
                {subject.name}
              </h2>
              <p className="text-muted-foreground">
                {subject.completedTopics} de {subject.totalTopics} tópicos concluídos
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Meta semanal: {subject.weeklyGoal}h
              </div>
              <div className="text-sm text-muted-foreground">
                Estudado esta semana: {subject.currentWeekStudied.toFixed(1)}h
              </div>
            </div>
            
            <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
              <DialogTrigger asChild>
                <LoadingButton className="gap-2" loading={isLoading}>
                  <Plus className="w-4 h-4" />
                  Novo Tópico
                </LoadingButton>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Novo Tópico</DialogTitle>
                </DialogHeader>
                <TopicForm
                  onSubmit={handleSubmit}
                  onCancel={() => setIsAddTopicOpen(false)}
                  isLoading={isLoading}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subject.topics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => handleToggleCompletion(topic.id)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          {topic.completed ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                        <CardTitle className={`text-lg ${topic.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {topic.name}
                        </CardTitle>
                      </div>
                      
                      {topic.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {topic.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            topic.priority === 'high' ? 'border-red-200 text-red-700' :
                            topic.priority === 'medium' ? 'border-blue-200 text-blue-700' :
                            'border-gray-200 text-gray-700'
                          }`}
                        >
                          {topic.priority === 'high' ? 'Alta' : topic.priority === 'medium' ? 'Média' : 'Baixa'}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            topic.difficulty === 'hard' ? 'border-red-200 text-red-700' :
                            topic.difficulty === 'medium' ? 'border-yellow-200 text-yellow-700' :
                            'border-green-200 text-green-700'
                          }`}
                        >
                          {topic.difficulty === 'hard' ? 'Difícil' : topic.difficulty === 'medium' ? 'Médio' : 'Fácil'}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {topic.estimatedTime}min
                        </Badge>
                      </div>
                      
                      {topic.tags && topic.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {topic.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {topic.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{topic.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTopic(topic)}
                        className="h-8 w-8"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTopic(topic.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={`/topic/${subjectId}/${topic.id}`}>
                      <Target className="w-4 h-4 mr-2" />
                      Entrar no Tópico
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card
              onClick={() => setIsAddTopicOpen(true)}
              className="border-2 border-dashed border-primary/30 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="flex flex-col items-center justify-center h-32 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">
                    Adicionar Tópico
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isEditTopicOpen} onOpenChange={setIsEditTopicOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Tópico</DialogTitle>
            </DialogHeader>
            <TopicForm
              topic={currentTopic}
              onSubmit={handleSubmit}
              onCancel={() => setIsEditTopicOpen(false)}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>

        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Excluir Tópico"
          description="Tem certeza que deseja excluir este tópico? Esta ação não pode ser desfeita. Todas as anotações associadas serão removidas."
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="destructive"
          icon={<Trash2 className="h-4 w-4" />}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default SubjectTopics;
