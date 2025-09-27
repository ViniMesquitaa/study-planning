import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ColorPicker } from "@/lib/ColorPicker";
import { X, Plus, RotateCcw } from "lucide-react";
import { useSubjectsStore, Subject } from "@/store/useSubjects";

const subjectSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z.string().max(200, "Descrição muito longa").optional(),
  color: z.string().min(1, "Cor é obrigatória"),
  weeklyGoal: z
    .number()
    .min(1, "Meta deve ser pelo menos 1 hora")
    .max(168, "Meta muito alta"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  category: z.string().min(1, "Categoria é obrigatória"),
  tags: z.array(z.string()).optional(),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  subject?: Subject;
  onSubmit: (data: SubjectFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const categories = [
  "Exatas",
  "Humanas",
  "Biológicas",
  "Linguagens",
  "Tecnologia",
  "Artes",
  "Outros",
];

const difficulties = [
  { value: "easy", label: "Fácil", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Médio", color: "bg-yellow-100 text-yellow-800" },
  { value: "hard", label: "Difícil", color: "bg-red-100 text-red-800" },
];

export function SubjectForm({
  subject,
  onSubmit,
  onCancel,
  isLoading = false,
}: SubjectFormProps) {
  const { resetSubjectProgress } = useSubjectsStore();
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>(subject?.tags || []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: subject?.name || "",
      description: subject?.description || "",
      color: subject?.color || "#3b82f6",
      weeklyGoal: subject?.weeklyGoal || 5,
      difficulty: subject?.difficulty || "medium",
      category: subject?.category || "",
      tags: subject?.tags || [],
    },
  });

  const watchedColor = watch("color");
  const watchedDifficulty = watch("difficulty");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setValue("tags", updatedTags);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const handleFormSubmit = (data: SubjectFormData) => {
    onSubmit({ ...data, tags });
  };

  const handleResetProgress = () => {
    if (
      subject &&
      window.confirm(
        "Tem certeza que deseja resetar o progresso desta matéria? Esta ação não pode ser desfeita."
      )
    ) {
      resetSubjectProgress(subject.id);
      onCancel(); // Close the dialog after resetting
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Matéria *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Ex: Matemática"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select
            value={watch("category")}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Descreva brevemente esta matéria..."
          rows={3}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weeklyGoal">Meta Semanal (horas) *</Label>
          <Input
            id="weeklyGoal"
            type="number"
            min="1"
            max="168"
            {...register("weeklyGoal", { valueAsNumber: true })}
            className={errors.weeklyGoal ? "border-red-500" : ""}
          />
          {errors.weeklyGoal && (
            <p className="text-sm text-red-500">{errors.weeklyGoal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Dificuldade *</Label>
          <Select
            value={watchedDifficulty}
            onValueChange={(value) =>
              setValue("difficulty", value as "easy" | "medium" | "hard")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${difficulty.color}`}
                    >
                      {difficulty.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cor da Matéria *</Label>
        <ColorPicker
          color={watchedColor}
          onChange={(color) => setValue("color", color)}
        />
        {errors.color && (
          <p className="text-sm text-red-500">{errors.color.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
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
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <Button type="button" onClick={addTag} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 pt-4">
        <div>
          {subject && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleResetProgress}
              disabled={isLoading}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar Progresso
            </Button>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Salvando..."
              : subject
              ? "Atualizar"
              : "Criar Matéria"}
          </Button>
        </div>
      </div>
    </form>
  );
}
