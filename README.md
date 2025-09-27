# 🎯 Planning Study - MVP Profissional

Um planejador de estudos completo e profissional com timer Pomodoro, gerenciamento avançado de matérias e tópicos, sistema de anotações e interface moderna.

## ✨ Funcionalidades Implementadas

### 📊 Dashboard
- **Estatísticas em tempo real**: Minutos estudados hoje, matérias ativas, tópicos concluídos
- **Gráfico de barras**: Tempo estudado por matéria (esta semana)
- **Tópicos recentes**: Lista dos últimos tópicos trabalhados
- **Timer Pomodoro integrado**: Acesso rápido ao timer

### 📚 Gerenciamento Avançado de Matérias
- **CRUD completo**: Criar, editar e excluir matérias com validação
- **Campos detalhados**: Nome, descrição, categoria, dificuldade, tags
- **Cores personalizadas**: Cada matéria tem sua cor única
- **Metas semanais**: Defina quantas horas quer estudar por semana
- **Progresso visual**: Barras de progresso para acompanhar o desempenho
- **Sistema de tags**: Organize matérias com tags personalizadas

### 📝 Tópicos e Anotações Avançados
- **CRUD de tópicos**: Criar, editar e excluir tópicos com campos detalhados
- **Campos avançados**: Prioridade, dificuldade, tempo estimado, descrição
- **Sistema de conclusão**: Marcar tópicos como concluídos
- **Editor de notas**: Interface moderna e funcional para anotações
- **Navegação intuitiva**: Breadcrumbs e navegação clara entre matérias e tópicos
- **Sistema de tags**: Organize tópicos com tags personalizadas

### ⏰ Timer Pomodoro
- **Seleção de matéria**: Escolha qual matéria está estudando
- **Seleção de tópico**: Opcionalmente, especifique o tópico
- **Contabilização automática**: Tempo estudado é salvo automaticamente
- **Configurações personalizáveis**: Ajuste os tempos de estudo e pausa
- **Notificações**: Alertas quando as sessões terminam

### 🎨 Interface Profissional
- **Modo Dark/Light**: Toggle para alternar entre temas
- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Breadcrumbs**: Navegação clara e intuitiva
- **Loading states**: Feedback visual durante operações
- **Confirmações**: Diálogos de confirmação para ações importantes
- **Validação de formulários**: Validação em tempo real com mensagens de erro
- **Animações suaves**: Transições e hover effects profissionais

### 💾 Persistência de Dados
- **LocalStorage**: Todos os dados são salvos localmente
- **Estado global**: Gerenciado com Zustand
- **Sincronização**: Dados atualizados em tempo real em todas as telas

## 🚀 Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Zustand** para gerenciamento de estado
- **Recharts** para gráficos
- **Radix UI** + **shadcn/ui** para componentes
- **React Router** para navegação
- **React Hook Form** + **Zod** para formulários e validação
- **Lucide React** para ícones

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── dashboard/          # Componentes do dashboard
│   ├── subjects/           # Componentes de matérias
│   ├── pomodoro/           # Timer Pomodoro
│   └── ui/                 # Componentes base (shadcn/ui)
├── pages/
│   ├── Index.tsx           # Dashboard principal
│   ├── Subjects.tsx        # Lista de matérias
│   ├── SubjectTopics.tsx   # Tópicos de uma matéria
│   ├── TopicPage.tsx       # Página de anotações
│   └── Pomodoro.tsx        # Página do timer
├── store/
│   └── useSubjects.ts      # Store Zustand
└── lib/
    └── utils.ts            # Utilitários
```

## 🎯 Fluxo do Usuário

1. **Dashboard**: Visualize estatísticas e acesse funcionalidades
2. **Criar Matérias**: Adicione disciplinas com cores e metas
3. **Gerenciar Tópicos**: Dentro de cada matéria, crie tópicos de estudo
4. **Fazer Anotações**: Acesse tópicos para fazer anotações detalhadas
5. **Usar Pomodoro**: Selecione matéria/tópico e estude com timer
6. **Acompanhar Progresso**: Veja gráficos e estatísticas no dashboard

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Responsivo

O aplicativo é totalmente responsivo e funciona bem em:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🔮 Próximas Funcionalidades (MVP Expandido)

- [ ] Flashcards dentro de tópicos
- [ ] Sistema de gamificação (streaks, pontos, medalhas)
- [ ] Integração com IA para resumos e chat de dúvidas
- [ ] Agenda/calendário de estudos
- [ ] Backend real e autenticação de usuários
- [ ] Relatórios detalhados de progresso
- [ ] Modo offline completo

## 🎨 Design

- **Interface moderna** e intuitiva
- **Cores consistentes** com sistema de design
- **Animações suaves** para melhor UX
- **Feedback visual** para todas as ações
- **Acessibilidade** seguindo boas práticas

---

**Desenvolvido com ❤️ para ajudar estudantes a organizarem seus estudos de forma eficiente!**
