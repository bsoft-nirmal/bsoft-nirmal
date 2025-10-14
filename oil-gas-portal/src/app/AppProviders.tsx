import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import { ThemeProviderCustom } from '../theme/ThemeProvider';
import { AuthProvider } from '../features/auth/AuthContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProviderCustom>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <AuthProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProviderCustom>
  );
}
