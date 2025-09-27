import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { useSubjectsStore } from '@/store/useSubjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, CheckCircle, Circle, BookOpen, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { LoadingButton } from '@/components/ui/loading-button';

const TopicPage = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const { getSubjectById, getTopicById, updateTopic, toggleTopicCompletion } = useSubjectsStore();
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const subject = subjectId ? getSubjectById(subjectId) : null;
  const topic = subjectId && topicId ? getTopicById(subjectId, topicId) : null;

  useEffect(() => {
    if (topic) {
      setNotes(topic.notes || '');
    }
  }, [topic]);

  if (!subject || !topic) {
    return (
      <div className="min-h-screen bg-background font-inter">
        <Header />
        <main className="container mx-auto py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tópico não encontrado</h2>
            <Button asChild>
              <Link to="/subjects">Voltar para matérias</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleSaveNotes = async () => {
    if (!subjectId || !topicId) return;
    
    setIsSaving(true);
    try {
      updateTopic(subjectId, topicId, { notes });
      toast({
        title: 'Notas salvas!',
        description: 'Suas anotações foram salvas com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar suas anotações.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleCompletion = () => {
    if (!subjectId || !topicId) return;
    toggleTopicCompletion(subjectId, topicId);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="container mx-auto py-8">
        <div className="space-y-6">
          <Breadcrumb 
            items={[
              { label: 'Matérias', href: '/subjects', icon: <BookOpen className="h-4 w-4" /> },
              { label: subject.name, href: `/subjects/${subjectId}`, icon: <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} /> },
              { label: topic.name, icon: <Target className="h-4 w-4" /> }
            ]} 
          />
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/subjects/${subjectId}`}>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={handleToggleCompletion}
                  className="hover:opacity-70 transition-opacity"
                >
                  {topic.completed ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-foreground" style={{ color: subject.color }}>
                    {topic.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {subject.name} • {topic.completed ? 'Concluído' : 'Em andamento'}
                  </p>
                </div>
              </div>
              
              {topic.description && (
                <p className="text-muted-foreground mb-3">{topic.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    topic.priority === 'high' ? 'border-red-200 text-red-700' :
                    topic.priority === 'medium' ? 'border-blue-200 text-blue-700' :
                    'border-gray-200 text-gray-700'
                  }`}
                >
                  {topic.priority === 'high' ? 'Alta' : topic.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
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
                  {topic.estimatedTime}min estimado
                </Badge>
                {topic.tags && topic.tags.length > 0 && (
                  topic.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))
                )}
              </div>
            </div>
            <LoadingButton
              onClick={handleSaveNotes}
              loading={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Salvar
            </LoadingButton>
          </div>

          <Card className="h-[calc(100vh-200px)]">
            <CardHeader>
              <CardTitle>Anotações</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Digite suas anotações aqui...

Dicas:
• Use títulos com # para organizar
• Crie listas com - ou *
• Destaque informações importantes com **negrito**
• Adicione links com [texto](url)"
                className="h-full min-h-[400px] resize-none border-0 focus-visible:ring-0 text-sm leading-relaxed"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
              />
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>Suas anotações são salvas automaticamente quando você clica em "Salvar"</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopicPage;
