export interface ComponentMeta {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnail?: string;
  isFixed?: boolean;
  fixedPosition?: 'top' | 'bottom';
  isLayout?: boolean;
  allowedChildren?: string[];
}

export interface ComponentStyle {
  typography?: {
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
  spacing?: {
    padding?: string;
    margin?: string;
    gap?: string;
  };
  colors?: {
    text?: string;
    background?: string;
    border?: string;
  };
  border?: {
    width?: string;
    style?: string;
    radius?: string;
  };
}

export interface ComponentInstance {
  id: string;
  componentId: string;
  children?: ComponentInstance[];
  styles?: ComponentStyle;
  content?: string;
}

export type ViewMode = 'mobile' | 'tablet' | 'desktop';
export type BuilderStep = 'layout' | 'styling' | 'preview';
export type FontFamily = 'inter' | 'roboto' | 'playfair';

export interface BuilderState {
  components: ComponentInstance[];
  activeComponent: string | null;
  theme: ThemeConfig;
  hiddenComponents: string[];
  currentStep: BuilderStep;
  viewMode: ViewMode;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  addComponent: (componentId: string, parentId?: string) => void;
  removeComponent: (instanceId: string) => void;
  setActiveComponent: (instanceId: string | null) => void;
  toggleComponentVisibility: (instanceId: string) => void;
  setCurrentStep: (step: BuilderStep) => void;
  setViewMode: (mode: ViewMode) => void;
  reorderComponents: (fromIndex: number, toIndex: number, parentId?: string) => void;
  moveComponent: (instanceId: string, targetParentId: string | null, index: number) => void;
  updateComponentStyles: (instanceId: string, styles: ComponentStyle) => void;
  updateComponentContent: (instanceId: string, content: string) => void;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  typography: {
    headingFont: FontFamily;
    bodyFont: FontFamily;
  };
  spacing: {
    containerPadding: string;
    sectionGap: string;
  };
  borderRadius: string;
}