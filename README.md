# 🎨 Slide Editor

Editor de slides moderno desenvolvido com **React + TypeScript + Konva**, com foco em criação de slides no estilo “Canva/Mentimeter”, permitindo adicionar e manipular elementos no canvas com persistência local.

> ✅ Este repositório cobre a experiência do **Professor (Teacher Editor)**: criação, edição e persistência de slides.  
> 🚧 Próximo passo (opcional): interface do **Aluno** + **slides interativos** (ex: Multiple Choice em tempo real).

---

## ✨ Funcionalidades

### 🎯 Slides
- ✅ Criar novos slides
- ✅ Navegar entre slides
- ✅ Persistência automática (localStorage via Zustand Persist)

### 📝 Elementos de Texto
- ✅ Adicionar texto
- ✅ **Edição inline** (duplo clique)
- ✅ **Arrastar e posicionar** (drag & drop)
- ✅ **Rotação**
- ✅ **Redimensionamento** (Transformer)
- ✅ **Seleção visual** (alças de controle)
- ✅ Persistência de todas as alterações

### 🖼️ Elementos de Imagem
- ✅ Upload e inserção de imagens
- ✅ **Arrastar e posicionar**
- ✅ **Rotação**
- ✅ **Redimensionamento** (Transformer)
- ✅ **Seleção visual**
- ✅ Persistência de todas as alterações

### ⌨️ Controles e Atalhos
- ✅ `Delete` / `Backspace` — Deletar elemento selecionado
- ✅ `Duplo clique` — Editar texto
- ✅ `Clique simples` — Selecionar elemento
- ✅ `Clique no fundo` — Desselecionar
- ✅ `Enter` / `Escape` — Finalizar edição de texto

### 🎨 UI / UX
- ✅ Canvas responsivo (960x540)
- ✅ Sidebar com lista de slides e ações rápidas
- ✅ Feedback visual durante interações
- ✅ Tela inicial para fluxo de “começar a criar”

---

## 🧠 Decisões Técnicas e Trade-offs

- **Zustand** foi escolhido pela simplicidade e previsibilidade do estado global.
- A persistência foi feita no **localStorage** (via `persist`) para manter o foco na **experiência do editor**.
- O **Konva** é usado apenas para **renderização e interação visual** (drag/resize/rotate).
- O estado do editor é a **source of truth** no store — evitando acoplamento de lógica ao canvas.

---

## 🧱 Arquitetura de Estado (Zustand)

O store mantém:
- `slides`: lista de slides com seus elementos
- `activeSlideId`: slide atual
- `selectedElementId`: elemento selecionado no canvas

Ações principais:
- `addSlide`, `setActiveSlide`
- `addTextElement`, `addImageElement`
- `updateElement`, `removeElement`
- `setSelectedElement`

---

## 💾 Persistência (localStorage)

A persistência é automática usando `zustand/middleware`:

- Slides e elementos são serializados em JSON
- Alterações permanecem após recarregar a página (F5)

> Observação: imagens são armazenadas como `base64` (DataURL). Em produção, isso normalmente seria substituído por upload + URL.

---

## 🎨 Paleta de Cores e Variáveis CSS

Cores disponíveis como variáveis em `src/styles/variables.scss`:

```scss
:root {
  --primary-color: #5C8EF2;
  --secondary-color: #3C4959;
  --accent-color: #038C7F;
  --success-color: #65BFAF;
  --warning-color: #F2B84B;
}
