# 🎨 Interactive Slide Editor (Teacher + Student)

Editor de slides interativo desenvolvido com **React + TypeScript + Konva**, inspirado em ferramentas como **Canva** e **Mentimeter**.

O projeto permite que professores criem apresentações visuais e interativas e que alunos participem em tempo real por meio de uma interface separada.

---

## 🎯 Objetivo do Projeto


- Arquitetura de aplicações React
- Manipulação avançada de canvas (Konva)
- Experiência interativa em tempo real
- Separação clara entre **Teacher (Editor)** e **Student (Interação)**

---

## 🧪 Slides Interativos (Mentimeter-like)

Foram implementados **3 tipos de slides interativos**, atendendo ao requisito do desafio:

### ✅ 1. Multiple Choice
- Professor define pergunta e opções
- Alunos votam a partir de seus dispositivos
- Resultados exibidos **em tempo real** em formato de **gráfico de barras**

### ✅ 2. Word Cloud
- Alunos enviam palavras livres
- As palavras aparecem em uma **nuvem**
- O tamanho de cada palavra cresce conforme a frequência

### ✅ 3. Live Bar Chart / Ranking
- Respostas agregadas e exibidas em barras
- Atualização ao vivo conforme novos votos chegam

> 🔄 **Realtime:** implementado via `localStorage + storage events` entre abas/janelas  
> ⚖️ **Trade-off:** solução simples para demo sem backend. Em produção, pode ser substituída facilmente por WebSocket (ex: Socket.io).

---

## 🧑‍🏫 Teacher (Editor)

### Funcionalidades
- Criar, remover e navegar entre slides
- Canvas interativo com **drag, resize e rotate**
- Elementos de texto e imagem
- Slides estáticos e interativos
- Gerenciamento de sessão para alunos
- Publicação de perguntas em tempo real

### Elementos de Texto
- Edição inline (duplo clique)
- Arrastar e posicionar
- Redimensionar e rotacionar
- Seleção visual com Transformer
- Persistência automática

### Elementos de Imagem
- Upload local (DataURL)
- Arrastar, redimensionar e rotacionar
- Seleção visual
- Persistência automática

---

## 👨‍🎓 Student (Interação)

- Interface separada por rota (`/student/:sessionId`)
- Recebe perguntas publicadas pelo professor
- Envia respostas (votos ou palavras)
- Atualizações refletidas imediatamente no Teacher
- Controle para evitar múltiplos votos no mesmo slide

---

## ⌨️ Controles e Atalhos

- `Delete / Backspace` → remover elemento selecionado
- Clique simples → selecionar
- Duplo clique → editar texto
- Clique no fundo → desselecionar
- `Enter / Escape` → finalizar edição de texto

---

## 💾 Persistência

- Implementada com **Zustand + persist**
- Slides e elementos são salvos automaticamente no `localStorage`
- Estado restaurado ao recarregar a página

> ℹ️ Imagens são armazenadas como **base64 (DataURL)**.  
> Em produção, isso seria substituído por upload + URL.

---

## 🧠 Arquitetura e Decisões Técnicas

- **React + TypeScript** para segurança e legibilidade
- **Zustand** para estado global simples e previsível
- **Konva / React-Konva** para interação rica com canvas
- Lógica desacoplada da camada visual
- Store como **single source of truth**
- Separação clara entre:
  - UI
  - Estado
  - Canvas
  - Regras de interação

---

## 🗺️ Rotas da Aplicação

- `/` → Home
- `/teacher` → Editor do Professor
- `/student/:sessionId` → Interface do Aluno

---

## 🚦 Demo rápida (Real-time)

> ⚠️ O evento `storage` funciona entre **abas ou janelas diferentes**

1. Acesse `/teacher`
2. Clique em **Iniciar sessão**
3. Crie um slide interativo (Multiple Choice ou Word Cloud)
4. Clique em **Publicar para alunos**
5. Abra o link do aluno em outra aba (`/student/:sessionId`)
6. Envie respostas e veja o Teacher atualizar em tempo real ✅

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação
```bash
git clone https://github.com/victoradler/interactive-slides-editor.git
cd interactive-slides-editor
npm install


Desenvolvido por [Victor Adler](https://github.com/victoradler10)```
