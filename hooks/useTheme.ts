'use client';

import { useBuilderStore } from '@/lib/store';
import { FONT_FAMILIES } from '@/lib/fonts';
import { ComponentInstance } from '@/lib/types';

export function useTheme(instanceId?: string) {
  const theme = useBuilderStore((state) => state.theme);
  const currentStep = useBuilderStore((state) => state.currentStep);
  const components = useBuilderStore((state) => state.components);

  const findComponent = (components: ComponentInstance[], id: string): ComponentInstance | undefined => {
    for (const component of components) {
      if (component.id === id) return component;
      if (component.children) {
        const found = findComponent(component.children, id);
        if (found) return found;
      }
    }
  };

  const componentInstance = instanceId ? findComponent(components, instanceId) : undefined;
  const componentStyles = componentInstance?.styles || {};

  const headingFont = FONT_FAMILIES[theme.typography.headingFont];
  const bodyFont = FONT_FAMILIES[theme.typography.bodyFont];

  const globalStyles = currentStep !== 'wireframe' ? {
    '--heading-font': `var(--font-${theme.typography.headingFont})`,
    '--body-font': `var(--font-${theme.typography.bodyFont})`,
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--container-padding': theme.spacing.containerPadding,
    '--section-gap': theme.spacing.sectionGap,
    '--border-radius': theme.borderRadius,
  } as React.CSSProperties : {};

  const componentSpecificStyles = {
    ...(componentStyles.typography && {
      fontSize: componentStyles.typography.fontSize,
      fontWeight: componentStyles.typography.fontWeight,
      lineHeight: componentStyles.typography.lineHeight,
      textAlign: componentStyles.typography.textAlign,
    }),
    ...(componentStyles.spacing && {
      padding: componentStyles.spacing.padding,
      margin: componentStyles.spacing.margin,
      gap: componentStyles.spacing.gap,
    }),
    ...(componentStyles.colors && {
      color: componentStyles.colors.text,
      backgroundColor: componentStyles.colors.background,
      borderColor: componentStyles.colors.border,
    }),
    ...(componentStyles.border && {
      borderWidth: componentStyles.border.width,
      borderStyle: componentStyles.border.style,
      borderRadius: componentStyles.border.radius,
    }),
  };

  // Remove undefined values
  const cleanStyles = Object.entries(componentSpecificStyles).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  return {
    theme,
    styles: {
      ...globalStyles,
      ...cleanStyles,
    },
    headingFont,
    bodyFont,
    isThemeEnabled: currentStep !== 'wireframe',
    componentStyles,
  };
}