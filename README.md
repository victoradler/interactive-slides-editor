# 🎨 Frontend Teacher - Editor de Slides Interativo

> Um editor de apresentações moderno e intuitivo desenvolvido com React, TypeScript e Konva para criar slides interativos com elementos de texto e imagem.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev/)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Arquitetura](#-arquitetura)
- [Paleta de Cores](#-paleta-de-cores)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts](#-scripts)
- [Contribuição](#-contribuição)

---

## 🎯 Visão Geral

O **Frontend Teacher** é uma aplicação web para criação e edição de apresentações de forma visual e interativa. Inspirado em ferramentas profissionais, oferece uma experiência fluida com drag-and-drop, edição inline e controles intuitivos.

### ✨ Destaques

- 🎨 **Interface moderna** com feedback visual em tempo real
- ⚡ **Performance otimizada** usando Canvas 2D (Konva.js)
- 💾 **Persistência automática** de todas as alterações
- 🎯 **Controles intuitivos** com atalhos de teclado
- 📱 **Canvas responsivo** com proporção 16:9

---

## 🚀 Funcionalidades

### 📊 Gerenciamento de Slides

- ✅ Criar, navegar e organizar slides
- ✅ Seleção visual do slide ativo
- ✅ Estado global sincronizado com Zustand

### 📝 Elementos de Texto

| Funcionalidade | Descrição |
|----------------|-----------|
| **Adicionar** | Clique em "+ Texto" para inserir |
| **Editar** | Duplo clique para edição inline |
| **Posicionar** | Arraste livremente pelo canvas |
| **Rotacionar** | Use a alça superior do transformer |
| **Redimensionar** | Arraste as bordas/cantos |
| **Deletar** | Selecione e pressione Delete/Backspace |

### 🖼️ Elementos de Imagem

| Funcionalidade | Descrição |
|----------------|-----------|
| **Upload** | Suporte a formatos JPG, PNG, SVG |
| **Posicionar** | Arraste livremente pelo canvas |
| **Rotacionar** | Use a alça superior do transformer |
| **Redimensionar** | Mantém proporção e qualidade |
| **Deletar** | Selecione e pressione Delete/Backspace |

### ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Delete` / `Backspace` | Deletar elemento selecionado |
| `Enter` / `Esc` | Finalizar edição de texto |
| `Duplo clique` | Editar texto |
| `Clique simples` | Selecionar elemento |
| `Clique no fundo` | Desselecionar tudo |

---

## 🛠️ Tecnologias

### Core

- **[React 18](https://reactjs.org/)** - Biblioteca para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápida

### Canvas & Estado

- **[Konva.js](https://konvajs.org/)** - Renderização 2D performática
- **[React-Konva](https://konvajs.org/docs/react/)** - Integração React + Konva
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado simples

### Estilização & Qualidade

- **[SASS](https://sass-lang.com/)** - Pré-processador CSS
- **[ESLint](https://eslint.org/)** - Linting e padronização

### ⚖️ Decisões Técnicas

| Decisão | Razão |
|---------|-------|
| **Zustand** | Simplicidade e previsibilidade do estado |
| **Konva** | Performance superior para manipulação gráfica |
| **Persistência local** | Foco na UX sem complexidade de backend |
| **TypeScript** | Segurança de tipos e melhor DX |

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/frontend-teacher.git

# Entre no diretório
cd frontend-teacher

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: `http://localhost:5173`

### Requisitos

- Node.js 18+ 
- npm 9+ ou yarn 1.22+

---

## 🎮 Como Usar

### 1️⃣ Criar um Slide

```
Clique em "+ Slide" → Novo slide é criado e selecionado automaticamente
```

### 2️⃣ Adicionar Texto

```
1. Clique em "+ Texto"
2. Duplo clique no texto para editar
3. Digite o conteúdo
4. Pressione Enter ou clique fora para finalizar
```

### 3️⃣ Adicionar Imagem

```
1. Clique em "+ Imagem"
2. Selecione o arquivo (JPG, PNG, SVG)
3. A imagem aparece no centro do canvas
```

### 4️⃣ Manipular Elementos

**Selecionar**: Clique no elemento  
**Mover**: Arraste o elemento  
**Rotacionar**: Arraste a alça superior circular  
**Redimensionar**: Arraste as bordas ou cantos  
**Deletar**: Selecione e pressione `Delete` ou `Backspace`

---

## 🏗️ Arquitetura

### Estado Global (Zustand)

```typescript
interface SlidesStore {
  // Estado
  slides: Slide[]
  activeSlideId: string | null
  
  // Ações
  addSlide: () => void
  setActiveSlide: (id: string) => void
  addTextElement: () => void
  addImageElement: (src: string) => void
  updateElement: (slideId: string, elementId: string, attrs: Partial<Element>) => void
  removeElement: (slideId: string, elementId: string) => void
}
```

### Tipos de Elementos

```typescript
// Texto
interface TextElement {
  id: string
  type: 'TEXT'
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  text: string
  fontSize: number
}

// Imagem
interface ImageElement {
  id: string
  type: 'IMAGE'
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  src: string
}
```

### Fluxo de Dados

```
User Action → Store Action → State Update → Re-render → Konva Canvas Update
```

---

## 🎨 Paleta de Cores

### Cores Principais

| Cor | Hex | Uso |
|-----|-----|-----|
| 🔵 **Primary** | `#5C8EF2` | Botões principais, destaques |
| ⚫ **Secondary** | `#3C4959` | Textos, bordas |
| 🟢 **Accent** | `#038C7F` | Hovers, estados ativos |
| 🟩 **Success** | `#65BFAF` | Confirmações, feedback positivo |
| 🟡 **Warning** | `#F2B84B` | Alertas, avisos |

### Variáveis CSS (SASS)

```scss
// Arquivo: src/styles/variables.scss
:root {
  --primary-color: #5C8EF2;
  --secondary-color: #3C4959;
  --accent-color: #038C7F;
  --success-color: #65BFAF;
  --warning-color: #F2B84B;
}
```

**Exemplo de uso:**

```scss
.my-button {
  background-color: var(--primary-color);
  border: 1px solid var(--secondary-color);
  
  &:hover {
    background-color: var(--accent-color);
  }
}
```

---

## 📁 Estrutura do Projeto

```
frontend-teacher/
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── CanvasStage.tsx      # Stage principal Konva
│   │   │   ├── TextElement.tsx      # Elemento de texto
│   │   │   └── ImageElement.tsx     # Elemento de imagem
│   │   └── ui/                      # Componentes de UI
│   │       └── Sidebar.tsx          # Barra lateral
│   ├── pages/
│   │   └── teacher.tsx              # Página principal
│   ├── store/
│   │   └── useSlidesStore.ts        # Store Zustand
│   ├── types/
│   │   └── slide.ts                 # Tipos TypeScript
│   ├── styles/
│   │   └── variables.scss           # Variáveis CSS
│   └── utils/                       # Funções utilitárias
├── public/                          # Assets estáticos
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔧 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Executa ESLint |
| `npm run type-check` | Verifica tipos TypeScript |

---

## 🌟 Recursos Avançados

### Persistência Automática
Todas as alterações (posição, rotação, dimensão, conteúdo) são salvas automaticamente no estado global e persistem entre navegações.

### Performance Otimizada
- Renderização via Canvas 2D para elementos gráficos complexos
- Re-renders otimizados com `React.memo` e `useCallback`
- Lazy loading de imagens

### UX Refinada
- Feedback visual imediato durante interações
- Prevenção de ações conflitantes (ex: não deletar durante edição)
- Transformações suaves com animações

---

## 🚧 Desenvolvimento

### Adicionar Nova Funcionalidade

1. **Definir tipos** em `src/types/slide.ts`
2. **Atualizar store** em `src/store/useSlidesStore.ts`
3. **Criar componente** em `src/components/canvas/`
4. **Integrar** no `CanvasStage.tsx`

### Padrões de Código

- ✅ Use TypeScript para todas as interfaces e tipos
- ✅ Siga configurações do ESLint
- ✅ Componentes pequenos e focados (< 200 linhas)
- ✅ Use hooks customizados para lógica complexa
- ✅ Teste funcionalidades críticas

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. 💻 Implemente as mudanças
4. ✅ Teste thoroughly
5. 📝 Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
6. 🚀 Push: `git push origin feature/nova-funcionalidade`
7. 🎉 Abra um Pull Request

### Commits Semânticos

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---


<div align="center">

**[⬆ Voltar ao topo](#-frontend-teacher---editor-de-slides-interativo)**

</div>