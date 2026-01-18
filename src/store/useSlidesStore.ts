import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { Slide, TextElement, ImageElement } from "../types/slide";

type SlidesStore = {
  slides: Slide[];
  activeSlideId: string | null;
  selectedElementId: string | null;

  addSlide: () => void;
  removeSlide: (id: string) => void;
  setActiveSlide: (id: string) => void;

  addTextElement: () => void;
  addImageElement: (imageSrc: string) => void;

  setSelectedElement: (id: string | null) => void;

  updateElement: (
    slideId: string,
    elementId: string,
    attrs: Partial<Slide["elements"][number]>
  ) => void;

  removeElement: (slideId: string, elementId: string) => void;
};

export const useSlidesStore = create<SlidesStore>()(
  persist(
    (set, get) => ({
      slides: [],
      activeSlideId: null,
      selectedElementId: null,

      addSlide: () =>
        set((state) => {
          const newSlide: Slide = {
            id: nanoid(),
            type: "STATIC",
            elements: [],
          };

          return {
            slides: [...state.slides, newSlide],
            activeSlideId: newSlide.id,
            selectedElementId: null,
          };
        }),

      removeSlide: (id) =>
        set((state) => {
          const newSlides = state.slides.filter((slide) => slide.id !== id);
          const newActiveSlideId =
            state.activeSlideId === id
              ? (newSlides.length > 0 ? newSlides[0].id : null)
              : state.activeSlideId;

          return {
            slides: newSlides,
            activeSlideId: newActiveSlideId,
            selectedElementId: null,
          };
        }),

      setActiveSlide: (id) =>
        set({
          activeSlideId: id,
          selectedElementId: null,
        }),

      setSelectedElement: (id) =>
        set({
          selectedElementId: id,
        }),

      addTextElement: () => {
        const { slides, activeSlideId } = get();
        if (!activeSlideId) return;

        const newText: TextElement = {
          id: nanoid(),
          type: "TEXT",
          x: 120,
          y: 120,
          width: 200,
          height: 40,
          rotation: 0,
          text: "Novo texto",
          fontSize: 24,
        };

        set({
          slides: slides.map((slide) =>
            slide.id === activeSlideId
              ? { ...slide, elements: [...slide.elements, newText] }
              : slide
          ),
          selectedElementId: newText.id,
        });
      },

      addImageElement: (src) => {
        const { slides, activeSlideId } = get();
        if (!activeSlideId) return;

        const newImage: ImageElement = {
          id: nanoid(),
          type: "IMAGE",
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          rotation: 0,
          src,
        };

        set({
          slides: slides.map((slide) =>
            slide.id === activeSlideId
              ? { ...slide, elements: [...slide.elements, newImage] }
              : slide
          ),
          selectedElementId: newImage.id,
        });
      },

      updateElement: (slideId, elementId, attrs) => {
        const { slides } = get();

        set({
          slides: slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  elements: slide.elements.map((el) =>
                    el.id === elementId
                      ? ({ ...el, ...attrs } as Slide["elements"][number])
                      : el
                  ),
                }
              : slide
          ),
        });
      },

      removeElement: (slideId, elementId) => {
        const { slides } = get();

        set({
          slides: slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  elements: slide.elements.filter(
                    (el) => el.id !== elementId
                  ),
                }
              : slide
          ),
        });
      },
    }),
    {
      name: "teachy-slides-storage",
    }
  )
);
