# 📘 API Documentation - Planning Study Backend

Documentação completa dos endpoints necessários para o backend da aplicação de planejamento de estudos.

## 🔐 Autenticação

Todos os endpoints (exceto os de autenticação pública) requerem um token JWT no header:

```
Authorization: Bearer {token}
```

---

## 📍 Endpoints

### 🔑 Autenticação

#### POST /api/auth/register
Registra um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "user": {
      "id": "uuid-v4",
      "name": "João Silva",
      "email": "joao@example.com",
      "createdAt": "2025-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- 400: Email já cadastrado
- 400: Validação de campos (senha fraca, email inválido, etc)

---

#### POST /api/auth/login
Autentica um usuário existente.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-v4",
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- 401: Credenciais inválidas
- 404: Usuário não encontrado

---

#### POST /api/auth/logout
Invalida o token atual do usuário.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

#### POST /api/auth/forgot-password
Envia um código OTP para o email do usuário.

**Request Body:**
```json
{
  "email": "joao@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Código OTP enviado para o email",
  "data": {
    "email": "joao@example.com",
    "expiresIn": 600
  }
}
```

**Errors:**
- 404: Email não encontrado

---

#### POST /api/auth/verify-otp
Verifica o código OTP enviado por email.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP verificado com sucesso",
  "data": {
    "resetToken": "temp-reset-token-xyz"
  }
}
```

**Errors:**
- 400: OTP inválido ou expirado
- 404: Email não encontrado

---

#### POST /api/auth/reset-password
Reseta a senha do usuário usando o token de reset.

**Request Body:**
```json
{
  "resetToken": "temp-reset-token-xyz",
  "newPassword": "novaSenha123",
  "confirmPassword": "novaSenha123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Senha alterada com sucesso"
}
```

**Errors:**
- 400: Token inválido ou expirado
- 400: Senhas não coincidem

---

#### GET /api/auth/me
Retorna os dados do usuário autenticado.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-v4",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-20T14:45:00Z"
  }
}
```

---

### 📚 Matérias (Subjects)

#### GET /api/subjects
Lista todas as matérias do usuário autenticado.

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `page` (optional): Número da página (default: 1)
- `limit` (optional): Itens por página (default: 20)
- `category` (optional): Filtrar por categoria
- `difficulty` (optional): Filtrar por dificuldade (easy, medium, hard)
- `search` (optional): Buscar por nome ou descrição

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "subjects": [
      {
        "id": "uuid-v4",
        "name": "Matemática",
        "description": "Cálculo e álgebra",
        "color": "#3B82F6",
        "icon": "calculator",
        "difficulty": "hard",
        "category": "Exatas",
        "tags": ["cálculo", "álgebra"],
        "weeklyGoal": 10,
        "currentWeekStudied": 6.5,
        "totalTopics": 15,
        "completedTopics": 8,
        "createdAt": "2025-01-10T08:00:00Z",
        "updatedAt": "2025-01-20T16:30:00Z",
        "lastStudied": "2025-01-20T16:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 45,
      "itemsPerPage": 20
    }
  }
}
```

---

#### GET /api/subjects/:id
Retorna uma matéria específica com todos os seus tópicos.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-v4",
    "name": "Matemática",
    "description": "Cálculo e álgebra",
    "color": "#3B82F6",
    "icon": "calculator",
    "difficulty": "hard",
    "category": "Exatas",
    "tags": ["cálculo", "álgebra"],
    "weeklyGoal": 10,
    "currentWeekStudied": 6.5,
    "totalTopics": 15,
    "completedTopics": 8,
    "topics": [
      {
        "id": "topic-uuid-1",
        "name": "Derivadas",
        "description": "Estudo de derivadas",
        "completed": false,
        "priority": "high",
        "difficulty": "hard",
        "estimatedTime": 120,
        "notes": "Conteúdo das notas...",
        "tags": ["cálculo"],
        "createdAt": "2025-01-10T09:00:00Z",
        "updatedAt": "2025-01-15T14:00:00Z",
        "lastStudied": "2025-01-15T14:00:00Z"
      }
    ],
    "createdAt": "2025-01-10T08:00:00Z",
    "updatedAt": "2025-01-20T16:30:00Z"
  }
}
```

**Errors:**
- 404: Matéria não encontrada
- 403: Matéria pertence a outro usuário

---

#### POST /api/subjects
Cria uma nova matéria.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "name": "Física",
  "description": "Mecânica e termodinâmica",
  "color": "#10B981",
  "icon": "atom",
  "difficulty": "medium",
  "category": "Exatas",
  "tags": ["mecânica", "termodinâmica"],
  "weeklyGoal": 8
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Matéria criada com sucesso",
  "data": {
    "id": "uuid-v4",
    "name": "Física",
    "description": "Mecânica e termodinâmica",
    "color": "#10B981",
    "icon": "atom",
    "difficulty": "medium",
    "category": "Exatas",
    "tags": ["mecânica", "termodinâmica"],
    "weeklyGoal": 8,
    "currentWeekStudied": 0,
    "totalTopics": 0,
    "completedTopics": 0,
    "createdAt": "2025-01-20T10:00:00Z",
    "updatedAt": "2025-01-20T10:00:00Z"
  }
}
```

**Errors:**
- 400: Validação de campos
- 409: Matéria com mesmo nome já existe

---

#### PUT /api/subjects/:id
Atualiza uma matéria existente.

**Headers:** `Authorization: Bearer {token}`

**Request Body (todos os campos são opcionais):**
```json
{
  "name": "Física Avançada",
  "description": "Mecânica quântica",
  "weeklyGoal": 12
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Matéria atualizada com sucesso",
  "data": {
    "id": "uuid-v4",
    "name": "Física Avançada",
    "description": "Mecânica quântica",
    "weeklyGoal": 12,
    "updatedAt": "2025-01-20T11:00:00Z"
  }
}
```

**Errors:**
- 404: Matéria não encontrada
- 403: Matéria pertence a outro usuário

---

#### DELETE /api/subjects/:id
Deleta uma matéria e todos os seus tópicos.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Matéria deletada com sucesso"
}
```

**Errors:**
- 404: Matéria não encontrada
- 403: Matéria pertence a outro usuário

---

### 📝 Tópicos (Topics)

#### GET /api/subjects/:subjectId/topics
Lista todos os tópicos de uma matéria.

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `completed` (optional): Filtrar por status (true/false)
- `priority` (optional): Filtrar por prioridade (low, medium, high)
- `difficulty` (optional): Filtrar por dificuldade (easy, medium, hard)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "subjectId": "uuid-v4",
    "subjectName": "Matemática",
    "topics": [
      {
        "id": "topic-uuid-1",
        "name": "Derivadas",
        "description": "Estudo de derivadas",
        "completed": false,
        "priority": "high",
        "difficulty": "hard",
        "estimatedTime": 120,
        "notes": "Conteúdo das notas...",
        "tags": ["cálculo"],
        "createdAt": "2025-01-10T09:00:00Z",
        "updatedAt": "2025-01-15T14:00:00Z",
        "lastStudied": "2025-01-15T14:00:00Z"
      }
    ]
  }
}
```

---

#### GET /api/subjects/:subjectId/topics/:topicId
Retorna um tópico específico.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "topic-uuid-1",
    "subjectId": "uuid-v4",
    "subjectName": "Matemática",
    "name": "Derivadas",
    "description": "Estudo de derivadas",
    "completed": false,
    "priority": "high",
    "difficulty": "hard",
    "estimatedTime": 120,
    "notes": "# Derivadas\n\nConteúdo em markdown...",
    "tags": ["cálculo", "limites"],
    "createdAt": "2025-01-10T09:00:00Z",
    "updatedAt": "2025-01-15T14:00:00Z",
    "lastStudied": "2025-01-15T14:00:00Z"
  }
}
```

**Errors:**
- 404: Tópico não encontrado
- 403: Tópico pertence a outro usuário

---

#### POST /api/subjects/:subjectId/topics
Cria um novo tópico em uma matéria.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "name": "Integrais",
  "description": "Estudo de integrais definidas e indefinidas",
  "priority": "high",
  "difficulty": "hard",
  "estimatedTime": 180,
  "tags": ["cálculo", "integrais"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Tópico criado com sucesso",
  "data": {
    "id": "topic-uuid-2",
    "subjectId": "uuid-v4",
    "name": "Integrais",
    "description": "Estudo de integrais definidas e indefinidas",
    "completed": false,
    "priority": "high",
    "difficulty": "hard",
    "estimatedTime": 180,
    "notes": "",
    "tags": ["cálculo", "integrais"],
    "createdAt": "2025-01-20T12:00:00Z",
    "updatedAt": "2025-01-20T12:00:00Z"
  }
}
```

**Errors:**
- 404: Matéria não encontrada
- 403: Matéria pertence a outro usuário

---

#### PUT /api/subjects/:subjectId/topics/:topicId
Atualiza um tópico existente.

**Headers:** `Authorization: Bearer {token}`

**Request Body (todos os campos são opcionais):**
```json
{
  "name": "Integrais Avançadas",
  "notes": "# Notas atualizadas\n\nConteúdo...",
  "priority": "medium"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tópico atualizado com sucesso",
  "data": {
    "id": "topic-uuid-2",
    "name": "Integrais Avançadas",
    "notes": "# Notas atualizadas\n\nConteúdo...",
    "priority": "medium",
    "updatedAt": "2025-01-20T13:00:00Z"
  }
}
```

---

#### DELETE /api/subjects/:subjectId/topics/:topicId
Deleta um tópico.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tópico deletado com sucesso"
}
```

---

#### PATCH /api/subjects/:subjectId/topics/:topicId/toggle
Alterna o status de conclusão de um tópico.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Status do tópico atualizado",
  "data": {
    "id": "topic-uuid-1",
    "completed": true,
    "updatedAt": "2025-01-20T14:00:00Z"
  }
}
```

---

### ⏱️ Sessões de Estudo (Study Sessions)

#### GET /api/study-sessions
Lista todas as sessões de estudo do usuário.

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `subjectId` (optional): Filtrar por matéria
- `topicId` (optional): Filtrar por tópico
- `startDate` (optional): Data inicial (ISO 8601)
- `endDate` (optional): Data final (ISO 8601)
- `type` (optional): Tipo de sessão (pomodoro, study)
- `page` (optional): Número da página
- `limit` (optional): Itens por página

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session-uuid-1",
        "userId": "user-uuid",
        "subjectId": "subject-uuid",
        "subjectName": "Matemática",
        "topicId": "topic-uuid",
        "topicName": "Derivadas",
        "duration": 25,
        "type": "pomodoro",
        "date": "2025-01-20T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100
    }
  }
}
```

---

#### POST /api/study-sessions
Cria uma nova sessão de estudo.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "subjectId": "subject-uuid",
  "topicId": "topic-uuid",
  "duration": 25,
  "type": "pomodoro"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Sessão de estudo registrada",
  "data": {
    "id": "session-uuid-1",
    "subjectId": "subject-uuid",
    "topicId": "topic-uuid",
    "duration": 25,
    "type": "pomodoro",
    "date": "2025-01-20T10:30:00Z"
  }
}
```

---

#### GET /api/study-sessions/stats
Retorna estatísticas gerais de estudo.

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `period` (optional): today, week, month, year (default: today)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": "today",
    "totalMinutes": 125,
    "totalSessions": 5,
    "averageSessionDuration": 25,
    "subjectsStudied": 3,
    "topicsCompleted": 2,
    "bySubject": [
      {
        "subjectId": "subject-uuid",
        "subjectName": "Matemática",
        "minutes": 75,
        "sessions": 3
      }
    ],
    "byDay": [
      {
        "date": "2025-01-20",
        "minutes": 125,
        "sessions": 5
      }
    ]
  }
}
```

---

#### GET /api/study-sessions/today
Retorna as sessões de estudo de hoje.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "date": "2025-01-20",
    "totalMinutes": 125,
    "totalSessions": 5,
    "sessions": [
      {
        "id": "session-uuid-1",
        "subjectName": "Matemática",
        "topicName": "Derivadas",
        "duration": 25,
        "type": "pomodoro",
        "time": "10:00:00"
      }
    ]
  }
}
```

---

#### GET /api/study-sessions/week
Retorna as sessões de estudo da semana atual.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "weekStart": "2025-01-15",
    "weekEnd": "2025-01-21",
    "totalMinutes": 875,
    "totalSessions": 35,
    "bySubject": [
      {
        "subjectId": "subject-uuid",
        "subjectName": "Matemática",
        "minutes": 350,
        "sessions": 14,
        "weeklyGoal": 600,
        "progress": 58.33
      }
    ],
    "byDay": [
      {
        "date": "2025-01-15",
        "minutes": 125,
        "sessions": 5
      }
    ]
  }
}
```

---

### 📊 Estatísticas (Stats)

#### GET /api/stats/dashboard
Retorna dados para o dashboard principal.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "today": {
      "minutes": 125,
      "sessions": 5,
      "topicsCompleted": 2
    },
    "week": {
      "minutes": 875,
      "sessions": 35,
      "topicsCompleted": 8,
      "subjectsStudied": 5
    },
    "month": {
      "minutes": 3550,
      "sessions": 142,
      "topicsCompleted": 28
    },
    "subjects": {
      "total": 12,
      "active": 8
    },
    "topics": {
      "total": 156,
      "completed": 78,
      "inProgress": 48,
      "notStarted": 30
    },
    "recentTopics": [
      {
        "id": "topic-uuid",
        "name": "Derivadas",
        "subjectName": "Matemática",
        "completed": true,
        "updatedAt": "2025-01-20T16:00:00Z"
      }
    ],
    "weeklyChart": [
      {
        "date": "2025-01-15",
        "Mathematics": 75,
        "Physics": 50,
        "Chemistry": 25
      }
    ]
  }
}
```

---

#### GET /api/stats/subject/:subjectId
Retorna estatísticas detalhadas de uma matéria.

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `period` (optional): week, month, year, all (default: week)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "subject": {
      "id": "subject-uuid",
      "name": "Matemática",
      "color": "#3B82F6"
    },
    "period": "week",
    "totalMinutes": 350,
    "totalSessions": 14,
    "weeklyGoal": 600,
    "progress": 58.33,
    "topics": {
      "total": 15,
      "completed": 8,
      "inProgress": 5,
      "notStarted": 2
    },
    "averageSessionDuration": 25,
    "longestStreak": 7,
    "currentStreak": 5,
    "chart": [
      {
        "date": "2025-01-15",
        "minutes": 50,
        "sessions": 2
      }
    ],
    "topicProgress": [
      {
        "topicId": "topic-uuid",
        "topicName": "Derivadas",
        "completed": true,
        "timeSpent": 120
      }
    ]
  }
}
```

---

## 🔒 Códigos de Status HTTP

- **200**: OK - Requisição bem-sucedida
- **201**: Created - Recurso criado com sucesso
- **400**: Bad Request - Erro de validação ou dados inválidos
- **401**: Unauthorized - Token ausente ou inválido
- **403**: Forbidden - Acesso negado ao recurso
- **404**: Not Found - Recurso não encontrado
- **409**: Conflict - Conflito (ex: email já cadastrado)
- **500**: Internal Server Error - Erro interno do servidor

---

## 🛡️ Segurança

### Autenticação JWT

Todos os endpoints protegidos requerem um token JWT válido. O token deve ser incluído no header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Rate Limiting

Implemente rate limiting para prevenir abuso:
- Login: 5 tentativas por minuto
- Register: 3 tentativas por hora
- Outros endpoints: 100 requisições por minuto

### Validações

- Senhas devem ter no mínimo 6 caracteres
- Emails devem ser válidos e únicos
- Todos os campos obrigatórios devem ser validados
- Sanitizar inputs para prevenir XSS e SQL Injection

---

## 📝 Notas Importantes

1. **Timestamps**: Todas as datas devem estar no formato ISO 8601 (UTC)
2. **UUIDs**: Use UUID v4 para IDs de recursos
3. **Paginação**: Limite padrão de 20 itens por página, máximo de 100
4. **CORS**: Configure CORS apropriadamente para o frontend
5. **Logs**: Implemente logging adequado para auditoria e debug
6. **Backup**: Implemente sistema de backup automático dos dados

---

## 🚀 Exemplos de Uso

### Fluxo Completo de Estudo

```javascript
// 1. Login
POST /api/auth/login
{ "email": "user@example.com", "password": "senha123" }

// 2. Buscar matérias
GET /api/subjects
Authorization: Bearer {token}

// 3. Criar tópico
POST /api/subjects/{subjectId}/topics
{ "name": "Derivadas", "priority": "high" }

// 4. Iniciar sessão Pomodoro
POST /api/study-sessions
{ "subjectId": "{id}", "topicId": "{id}", "duration": 25, "type": "pomodoro" }

// 5. Marcar tópico como completo
PATCH /api/subjects/{subjectId}/topics/{topicId}/toggle

// 6. Ver dashboard
GET /api/stats/dashboard
```

---

## 📞 Suporte

Para dúvidas sobre a implementação dos endpoints ou reportar bugs, entre em contato com a equipe de desenvolvimento.

**Versão da API**: 1.0.0
**Última atualização**: Janeiro 2025
