export const FONT_FAMILIES = {
  inter: {
    name: 'Inter',
    import: 'Inter',
    fallback: 'sans-serif',
    weights: [400, 500, 600, 700],
  },
  roboto: {
    name: 'Roboto',
    import: 'Roboto',
    fallback: 'sans-serif',
    weights: [400, 500, 700],
  },
  playfair: {
    name: 'Playfair Display',
    import: 'Playfair_Display',
    fallback: 'serif',
    weights: [400, 500, 600, 700],
  },
} as const;

export type FontFamily = keyof typeof FONT_FAMILIES;