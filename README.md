# 🎨 Frontend Teacher - Editor de Slides Interativo

Um editor de slides moderno e intuitivo desenvolvido com React, TypeScript e Konva para criar apresentações interativas com elementos de texto e imagem.

## ✨ Funcionalidades

### 🎯 Gerenciamento de Slides
- ✅ Criar novos slides
- ✅ Navegar entre slides
- ✅ Gerenciamento de estado global com Zustand

### 🎨 Paleta de Cores
- **Primary**: `#5C8EF2` - Azul principal
- **Secondary**: `#3C4959` - Cinza escuro
- **Accent**: `#038C7F` - Verde azulado
- **Success**: `#65BFAF` - Verde claro
- **Warning**: `#F2B84B` - Amarelo

### 💅 Variáveis CSS
As cores estão disponíveis como variáveis CSS no arquivo `src/styles/variables.scss`:
```scss
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

## 🚀 Tecnologias Utilizadas
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Konva.js** - Canvas 2D para manipulação gráfica
- **React-Konva** - Integração React com Konva
- **Zustand** - Gerenciamento de estado global
- **SASS** - Pré-processador CSS
- **ESLint** - Linting e padronização de código


## ⚖️ Trade-offs e Decisões Técnicas
- Zustand foi escolhido pela simplicidade e previsibilidade do estado
- Persistência local foi priorizada em vez de backend para focar na UX
- Konva é usado apenas para renderização e interação visual
- Nenhuma lógica crítica fica acoplada ao canva


### 📝 Elementos de Texto
- ✅ Adicionar elementos de texto
- ✅ **Edição inline** - Duplo clique para editar
- ✅ **Arrastar e posicionar** - Drag & drop intuitivo
- ✅ **Rotação** - Rotacionar elementos livremente
- ✅ **Redimensionamento** - Redimensionar com preservação de proporção
- ✅ **Seleção visual** - Transformer com alças de controle
- ✅ **Persistência** - Todas as alterações são salvas automaticamente

### 🖼️ Elementos de Imagem
- ✅ Upload e inserção de imagens
- ✅ **Arrastar e posicionar** - Drag & drop intuitivo
- ✅ **Rotação** - Rotacionar imagens livremente  
- ✅ **Redimensionamento** - Redimensionar mantendo qualidade
- ✅ **Seleção visual** - Transformer com alças de controle
- ✅ **Persistência** - Todas as alterações são salvas automaticamente

### ⌨️ Controles e Atalhos
- ✅ **Delete/Backspace** - Deletar elementos selecionados
- ✅ **Duplo clique** - Editar texto
- ✅ **Clique simples** - Selecionar elemento
- ✅ **Clique no fundo** - Desselecionar tudo
- ✅ **Enter/Escape** - Finalizar edição de texto

### 🎨 Interface
- ✅ Canvas responsivo (960x540)
- ✅ Sidebar com lista de slides
- ✅ Botões de ação intuitivos
- ✅ Visual feedback durante interações

## 📦 Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd frontend_teacher

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Execute build de produção
npm run build
```

## 🎮 Como Usar

### Criando Slides
1. Clique em **"+ Slide"** para criar um novo slide
2. O slide será criado e automaticamente selecionado

### Adicionando Texto
1. Clique em **"+ Texto"** para adicionar um elemento de texto
2. **Duplo clique** no texto para editá-lo
3. **Digite** o conteúdo desejado
4. **Enter** ou **clique fora** para finalizar a edição

### Adicionando Imagens
1. Clique em **"+ Imagem"** (se disponível)
2. Selecione uma imagem do seu computador
3. A imagem será adicionada ao slide atual

### Manipulando Elementos
- **Selecionar**: Clique simples no elemento
- **Arrastar**: Clique e arraste o elemento
- **Rotacionar**: Use a alça de rotação do Transformer
- **Redimensionar**: Arraste as alças das bordas/cantos
- **Deletar**: Selecione o elemento e pressione **Delete** ou **Backspace**

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── canvas/
│   │   ├── CanvasStage.tsx      # Stage principal do Konva
│   │   ├── TextElement.tsx      # Componente de texto
│   │   └── ImageElement.tsx     # Componente de imagem
│   └── ui/                      # Componentes de interface
├── pages/
│   └── teacher.tsx              # Página principal do editor
├── store/
│   └── useSlidesStore.ts        # Estado global (Zustand)
├── types/
│   └── slide.ts                 # Definições de tipos TypeScript
└── utils/                       # Funções utilitárias
```

## 🎯 Arquitetura de Estado

### Zustand Store (`useSlidesStore`)
```typescript
{
  slides: Slide[],              // Array de slides
  activeSlideId: string | null, // ID do slide ativo
  
  // Actions
  addSlide: () => void,
  setActiveSlide: (id: string) => void,
  addTextElement: () => void,
  addImageElement: (src: string) => void,
  updateElement: (slideId, elementId, attrs) => void,
  removeElement: (slideId, elementId) => void
}
```

### Tipos de Elementos
```typescript
// Elemento de Texto
TextElement {
  id: string,
  type: 'TEXT',
  x: number,
  y: number,
  width?: number,
  height?: number,
  rotation?: number,
  text: string,
  fontSize: number
}

// Elemento de Imagem  
ImageElement {
  id: string,
  type: 'IMAGE', 
  x: number,
  y: number,
  width?: number,
  height?: number,
  rotation?: number,
  src: string
}
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint

## 🌟 Recursos Avançados

### Persistência de Estado
- Todas as alterações são salvas automaticamente no estado global
- Posições, rotações, dimensões e conteúdo persistem entre navegações

### Performance
- Elementos são renderizados usando Konva.js para máxima performance
- Re-renders otimizados com React.memo e useCallback onde necessário

### Experiência do Usuário
- Feedback visual imediato durante interações
- Prevenção de ações conflitantes (ex: não deletar durante edição)
- Interface intuitiva seguindo padrões de editores gráficos

## 🚧 Desenvolvimento

### Adicionando Novas Funcionalidades
1. Defina os tipos em `src/types/slide.ts`
2. Atualize o store em `src/store/useSlidesStore.ts`
3. Crie componentes em `src/components/canvas/`
4. Integre no `CanvasStage.tsx`

### Padrões de Código
- Use TypeScript para tipagem forte
- Siga as configurações do ESLint
- Mantenha componentes pequenos e focados
- Use hooks customizados para lógica complexa

## 📝 Licença

Este projeto é parte de um desafio educacional e está disponível para fins de aprendizado.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste thoroughly
5. Submeta um Pull Request

