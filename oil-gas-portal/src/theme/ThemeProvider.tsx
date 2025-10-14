import { createTheme, ThemeProvider, StyledEngineProvider, responsiveFontSizes } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { createContext, useContext, useMemo, useState, useEffect, type PropsWithChildren } from 'react';
import { deepmerge } from '@mui/utils';

export type ColorPreset = 'default' | 'navy';

type ThemeContextValue = {
  mode: PaletteMode;
  preset: ColorPreset;
  toggleMode: () => void;
  setPreset: (preset: ColorPreset) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getDesignTokens(mode: PaletteMode, preset: ColorPreset) {
  const common = {
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { textTransform: 'none', borderRadius: 10, fontWeight: 600 },
        },
      },
      MuiCard: {
        styleOverrides: { root: { borderRadius: 14 } },
      },
      MuiPaper: {
        styleOverrides: { root: { borderRadius: 14 } },
      },
      MuiLink: {
        styleOverrides: { root: { cursor: 'pointer' } },
      },
      MuiFormLabel: { styleOverrides: { root: { fontWeight: 600 } } },
    },
  };

  const palettes = {
    default: {
      primary: { main: mode === 'light' ? '#21808d' : '#32b8c6' },
      secondary: { main: '#5e5240' },
      success: { main: '#21808d' },
      warning: { main: '#a84b2f' },
      error: { main: '#c0152f' },
    },
    navy: {
      primary: { main: mode === 'light' ? '#1e3a8a' : '#1e40af' },
      secondary: { main: '#fbbf24' },
    },
  } as const;

  const palette = palettes[preset] ?? palettes.default;

  return deepmerge(common, {
    palette: {
      mode,
      ...palette,
      background: {
        default: mode === 'light' ? '#fcfcf9' : '#262828',
        paper: mode === 'light' ? '#fffffd' : '#1f2121',
      },
    },
  });
}

export function ThemeProviderCustom({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<PaletteMode>(() => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [preset, setPreset] = useState<ColorPreset>('navy');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const theme = useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(mode, preset) as any)), [mode, preset]);
  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ mode, preset, toggleMode, setPreset }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProviderCustom');
  return ctx;
}
