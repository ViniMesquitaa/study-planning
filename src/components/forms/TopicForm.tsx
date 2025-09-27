import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Clock } from 'lucide-react';
import { Topic } from '@/store/useSubjects';

const topicSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
  priority: z.enum(['low', 'medium', 'high']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimatedTime: z.number().min(5, 'Tempo mínimo é 5 minutos').max(480, 'Tempo máximo é 8 horas'),
  tags: z.array(z.string()).optional(),
});

type TopicFormData = z.infer<typeof topicSchema>;

interface TopicFormProps {
  topic?: Topic;
  onSubmit: (data: TopicFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const priorities = [
  { value: 'low', label: 'Baixa', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Média', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-800' },
];

const difficulties = [
  { value: 'easy', label: 'Fácil', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Médio', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'hard', label: 'Difícil', color: 'bg-red-100 text-red-800' },
];

export function TopicForm({ topic, onSubmit, onCancel, isLoading = false }: TopicFormProps) {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>(topic?.tags || []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: topic?.name || '',
      description: topic?.description || '',
      priority: topic?.priority || 'medium',
      difficulty: topic?.difficulty || 'medium',
      estimatedTime: topic?.estimatedTime || 30,
      tags: topic?.tags || [],
    },
  });

  const watchedPriority = watch('priority');
  const watchedDifficulty = watch('difficulty');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setValue('tags', updatedTags);
  };

  const handleFormSubmit = (data: TopicFormData) => {
    onSubmit({ ...data, tags });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Tópico *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Ex: Derivadas"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Descreva brevemente este tópico..."
          rows={3}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade *</Label>
          <Select
            value={watchedPriority}
            onValueChange={(value) => setValue('priority', value as 'low' | 'medium' | 'high')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${priority.color}`}>
                      {priority.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Dificuldade *</Label>
          <Select
            value={watchedDifficulty}
            onValueChange={(value) => setValue('difficulty', value as 'easy' | 'medium' | 'hard')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${difficulty.color}`}>
                      {difficulty.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedTime">Tempo Estimado *</Label>
          <div className="relative">
            <Input
              id="estimatedTime"
              type="number"
              min="5"
              max="480"
              {...register('estimatedTime', { valueAsNumber: true })}
              className={errors.estimatedTime ? 'border-red-500' : ''}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatTime(watch('estimatedTime') || 30)}
          </p>
          {errors.estimatedTime && (
            <p className="text-sm text-red-500">{errors.estimatedTime.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Adicionar tag..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : topic ? 'Atualizar' : 'Criar Tópico'}
        </Button>
      </div>
    </form>
  );
}
