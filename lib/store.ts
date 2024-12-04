'use client';

import { create } from 'zustand';
import { BuilderState, ThemeConfig, ComponentInstance, ComponentStyle } from './types';
import { v4 as uuidv4 } from 'uuid';

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#0f172a',
    secondary: '#64748b',
    background: '#ffffff',
    accent: '#3b82f6',
  },
  typography: {
    headingFont: 'inter',
    bodyFont: 'inter',
  },
  spacing: {
    containerPadding: '2rem',
    sectionGap: '4rem',
  },
  borderRadius: '0.5rem',
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  components: [],
  activeComponent: null,
  theme: defaultTheme,
  hiddenComponents: [],
  currentStep: 'layout',
  viewMode: 'desktop',

  setCurrentStep: (step) => 
    set(() => ({
      currentStep: step,
    })),

  setViewMode: (mode) => 
    set(() => ({
      viewMode: mode,
    })),

  updateTheme: (updates) => 
    set((state) => ({
      theme: { ...state.theme, ...updates },
    })),

  addComponent: (componentId, parentId) =>
    set((state) => {
      const newComponent: ComponentInstance = {
        id: uuidv4(),
        componentId,
        children: [],
      };

      if (!parentId) {
        return {
          components: [...state.components, newComponent],
          activeComponent: newComponent.id,
        };
      }

      const updateChildren = (components: ComponentInstance[]): ComponentInstance[] => {
        return components.map(component => {
          if (component.id === parentId) {
            return {
              ...component,
              children: [...(component.children || []), newComponent],
            };
          }
          if (component.children) {
            return {
              ...component,
              children: updateChildren(component.children),
            };
          }
          return component;
        });
      };

      return {
        components: updateChildren(state.components),
        activeComponent: newComponent.id,
      };
    }),

  removeComponent: (instanceId) =>
    set((state) => {
      const removeFromArray = (components: ComponentInstance[]): ComponentInstance[] => {
        return components.filter(component => {
          if (component.id === instanceId) return false;
          if (component.children) {
            component.children = removeFromArray(component.children);
          }
          return true;
        });
      };

      return {
        components: removeFromArray(state.components),
        activeComponent: state.activeComponent === instanceId ? null : state.activeComponent,
        hiddenComponents: state.hiddenComponents.filter(id => id !== instanceId),
      };
    }),

  setActiveComponent: (instanceId) =>
    set(() => ({
      activeComponent: instanceId,
    })),

  toggleComponentVisibility: (instanceId) =>
    set((state) => ({
      hiddenComponents: state.hiddenComponents.includes(instanceId)
        ? state.hiddenComponents.filter(id => id !== instanceId)
        : [...state.hiddenComponents, instanceId],
    })),

  reorderComponents: (fromIndex, toIndex, parentId) =>
    set((state) => {
      const reorderInArray = (components: ComponentInstance[]): ComponentInstance[] => {
        if (!parentId) {
          const result = [...components];
          const [removed] = result.splice(fromIndex, 1);
          result.splice(toIndex, 0, removed);
          return result;
        }

        return components.map(component => {
          if (component.id === parentId && component.children) {
            const result = [...component.children];
            const [removed] = result.splice(fromIndex, 1);
            result.splice(toIndex, 0, removed);
            return { ...component, children: result };
          }
          if (component.children) {
            return {
              ...component,
              children: reorderInArray(component.children),
            };
          }
          return component;
        });
      };

      return {
        components: reorderInArray(state.components),
      };
    }),

  moveComponent: (instanceId, targetParentId, index) =>
    set((state) => {
      let componentToMove: ComponentInstance | null = null;
      
      const removeFromSource = (components: ComponentInstance[]): ComponentInstance[] => {
        return components.filter(component => {
          if (component.id === instanceId) {
            componentToMove = component;
            return false;
          }
          if (component.children) {
            component.children = removeFromSource(component.children);
          }
          return true;
        });
      };

      const addToTarget = (components: ComponentInstance[]): ComponentInstance[] => {
        if (!componentToMove) return components;

        if (!targetParentId) {
          const result = [...components];
          result.splice(index, 0, componentToMove);
          return result;
        }

        return components.map(component => {
          if (component.id === targetParentId) {
            const children = [...(component.children || [])];
            children.splice(index, 0, componentToMove);
            return { ...component, children };
          }
          if (component.children) {
            return {
              ...component,
              children: addToTarget(component.children),
            };
          }
          return component;
        });
      };

      const componentsAfterRemoval = removeFromSource(state.components);
      const finalComponents = addToTarget(componentsAfterRemoval);

      return {
        components: finalComponents,
      };
    }),

  updateComponentStyles: (instanceId, styles) =>
    set((state) => {
      const updateStyles = (components: ComponentInstance[]): ComponentInstance[] => {
        return components.map(component => {
          if (component.id === instanceId) {
            return {
              ...component,
              styles: {
                ...component.styles,
                ...styles,
              },
            };
          }
          if (component.children) {
            return {
              ...component,
              children: updateStyles(component.children),
            };
          }
          return component;
        });
      };

      return {
        components: updateStyles(state.components),
      };
    }),

  updateComponentContent: (instanceId, content) =>
    set((state) => {
      const updateContent = (components: ComponentInstance[]): ComponentInstance[] => {
        return components.map(component => {
          if (component.id === instanceId) {
            return {
              ...component,
              content,
            };
          }
          if (component.children) {
            return {
              ...component,
              children: updateContent(component.children),
            };
          }
          return component;
        });
      };

      return {
        components: updateContent(state.components),
      };
    }),
}));