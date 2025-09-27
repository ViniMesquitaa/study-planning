🎯 MVP Rápido – Planejador de Estudos
1️⃣ Telas / Funcionalidades
Tela Funcionalidades
Dashboard - Mostrar tempo total estudado no dia.

- Gráfico de barras mostrando minutos por matéria.
  Matérias - CRUD de matérias (nome + cor).
- Listar matérias.
- Botão “Entrar na matéria”.
  Tópicos da Matéria - Lista de tópicos dentro da matéria.
- CRUD de tópicos (nome do tópico).
- Cada tópico abre a Tela do Tópico.
  Tela do Tópico - Editor de notas (simples, textarea).
- Futuro: integração com IA para pesquisa/resumos.
  Pomodoro - Timer 25/5 min.
- Seleção de matéria antes de iniciar.
- Ao terminar, salva minutos estudados por matéria.
  2️⃣ Fluxo do Usuário

Usuário entra → Dashboard vazio.

Cadastra matérias → ex: Matemática, História.

Dentro da matéria → cadastra tópicos → ex: “Funções”, “Equações”.

Usuário entra em tópico → faz anotações.

Vai no Pomodoro → escolhe matéria → estuda 25 min → minutos são contabilizados no Dashboard.

3️⃣ Tecnologias

Frontend: React + Vite + Tailwind

Estado: Zustand ou Context API

Gráficos: Recharts

Armazenamento: localStorage (sem backend)

4️⃣ Estrutura de Pastas (sugestão)
src/
├─ pages/
│ ├─ Dashboard.tsx
│ ├─ Subjects.tsx
│ ├─ SubjectTopics.tsx
│ ├─ TopicPage.tsx
│ ├─ Pomodoro.tsx
├─ components/
│ ├─ Navbar.tsx
│ ├─ SubjectCard.tsx
│ ├─ TopicCard.tsx
│ ├─ Timer.tsx
├─ store/
│ ├─ useSubjects.ts
│ ├─ usePomodoro.ts
├─ App.tsx
├─ main.tsx

5️⃣ MVP Expandido / Futuro

Flashcards dentro de tópicos.

Gamificação: streak, pontos, medalhas.

Integração com IA: resumos e chat de dúvidas.

Agenda/calendário de estudos.

Backend real e login de usuários.

Se quiser, posso montar o código inicial em React + Tailwind + Zustand já com:

Dashboard

Matérias + tópicos

Tela do tópico (notas simples)

Pomodoro contabilizando tempo por matéria

Isso já te dá um MVP funcional completo para começar a testar.
