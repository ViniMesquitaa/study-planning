import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Topic {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // em minutos
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  lastStudied?: Date;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  totalTopics: number;
  completedTopics: number;
  weeklyGoal: number;
  currentWeekStudied: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  topics: Topic[];
  createdAt: Date;
  updatedAt: Date;
  lastStudied?: Date;
}

export interface StudySession {
  id: string;
  subjectId: string;
  topicId?: string;
  duration: number; // em minutos
  date: Date;
  type: 'pomodoro' | 'study';
}

interface SubjectsState {
  subjects: Subject[];
  studySessions: StudySession[];
  
  // Actions para matérias
  addSubject: (subject: Omit<Subject, 'id' | 'totalTopics' | 'completedTopics' | 'currentWeekStudied' | 'topics' | 'createdAt' | 'updatedAt'>) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  // Actions para tópicos
  addTopic: (subjectId: string, topic: Omit<Topic, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => void;
  updateTopic: (subjectId: string, topicId: string, updates: Partial<Topic>) => void;
  deleteTopic: (subjectId: string, topicId: string) => void;
  toggleTopicCompletion: (subjectId: string, topicId: string) => void;
  
  // Actions para sessões de estudo
  addStudySession: (session: Omit<StudySession, 'id' | 'date'>) => void;
  
  // Getters
  getSubjectById: (id: string) => Subject | undefined;
  getTopicById: (subjectId: string, topicId: string) => Topic | undefined;
  getTodayStudyTime: () => number;
  getWeekStudyTime: () => number;
  getSubjectStudyTime: (subjectId: string) => number;
  getSubjectStudyTimeToday: (subjectId: string) => number;
  resetWeeklyProgress: () => void;
  resetSubjectProgress: (subjectId: string) => void;
}

export const useSubjectsStore = create<SubjectsState>()(
  persist(
    (set, get) => ({
      subjects: [],
      studySessions: [],

      addSubject: (subjectData) => {
        const newSubject: Subject = {
          ...subjectData,
          id: Date.now().toString(),
          totalTopics: 0,
          completedTopics: 0,
          currentWeekStudied: 0,
          topics: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          subjects: [...state.subjects, newSubject],
        }));
      },

      updateSubject: (id, updates) => {
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === id
              ? { ...subject, ...updates, updatedAt: new Date() }
              : subject
          ),
        }));
      },

      deleteSubject: (id) => {
        set((state) => ({
          subjects: state.subjects.filter((subject) => subject.id !== id),
          studySessions: state.studySessions.filter((session) => session.subjectId !== id),
        }));
      },

      addTopic: (subjectId, topicData) => {
        const newTopic: Topic = {
          ...topicData,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: [...subject.topics, newTopic],
                  totalTopics: subject.totalTopics + 1,
                  updatedAt: new Date(),
                }
              : subject
          ),
        }));
      },

      updateTopic: (subjectId, topicId, updates) => {
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: subject.topics.map((topic) =>
                    topic.id === topicId
                      ? { ...topic, ...updates, updatedAt: new Date() }
                      : topic
                  ),
                  updatedAt: new Date(),
                }
              : subject
          ),
        }));
      },

      deleteTopic: (subjectId, topicId) => {
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: subject.topics.filter((topic) => topic.id !== topicId),
                  totalTopics: subject.totalTopics - 1,
                  completedTopics: subject.completedTopics - 
                    (subject.topics.find((topic) => topic.id === topicId)?.completed ? 1 : 0),
                  updatedAt: new Date(),
                }
              : subject
          ),
        }));
      },

      toggleTopicCompletion: (subjectId, topicId) => {
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  topics: subject.topics.map((topic) =>
                    topic.id === topicId
                      ? { ...topic, completed: !topic.completed, updatedAt: new Date() }
                      : topic
                  ),
                  completedTopics: subject.completedTopics + 
                    (subject.topics.find((topic) => topic.id === topicId)?.completed ? -1 : 1),
                  updatedAt: new Date(),
                }
              : subject
          ),
        }));
      },

      addStudySession: (sessionData) => {
        const newSession: StudySession = {
          ...sessionData,
          id: Date.now().toString(),
          date: new Date(),
        };

        set((state) => ({
          studySessions: [...state.studySessions, newSession],
        }));

        // Atualizar tempo estudado da matéria
        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === sessionData.subjectId
              ? {
                  ...subject,
                  currentWeekStudied: subject.currentWeekStudied + sessionData.duration / 60, // converter para horas
                  updatedAt: new Date(),
                }
              : subject
          ),
        }));
      },

      getSubjectById: (id) => {
        return get().subjects.find((subject) => subject.id === id);
      },

      getTopicById: (subjectId, topicId) => {
        const subject = get().getSubjectById(subjectId);
        return subject?.topics.find((topic) => topic.id === topicId);
      },

      getTodayStudyTime: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return get().studySessions
          .filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate >= today && sessionDate < tomorrow;
          })
          .reduce((total, session) => total + session.duration, 0);
      },

      getWeekStudyTime: () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        return get().studySessions
          .filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate >= startOfWeek;
          })
          .reduce((total, session) => total + session.duration, 0);
      },

      getSubjectStudyTime: (subjectId) => {
        return get().studySessions
          .filter((session) => session.subjectId === subjectId)
          .reduce((total, session) => total + session.duration, 0);
      },

      getSubjectStudyTimeToday: (subjectId) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return get().studySessions
          .filter((session) => {
            const sessionDate = new Date(session.date);
            return session.subjectId === subjectId && sessionDate >= today && sessionDate < tomorrow;
          })
          .reduce((total, session) => total + session.duration, 0);
      },

      resetWeeklyProgress: () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        set((state) => ({
          studySessions: state.studySessions.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate < startOfWeek;
          }),
          subjects: state.subjects.map((subject) => ({
              ...subject,
              currentWeekStudied: 0,
              weeklyGoal: 0,
          }))
        }));
      },

      resetSubjectProgress: (subjectId) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        set((state) => ({
          subjects: state.subjects.map((subject) =>
            subject.id === subjectId
              ? {
                  ...subject,
                  currentWeekStudied: 0,
                  completedTopics: 0,
                  topics: subject.topics.map((topic) => ({
                    ...topic,
                    completed: false,
                  })),
                }
              : subject
          ),
          studySessions: state.studySessions.filter((session) => {
              const sessionDate = new Date(session.date);
              return !(session.subjectId === subjectId && sessionDate >= startOfWeek);
          }),
        }));
      },
    }),
    {
      name: 'subjects-storage',
    }
  )
);
