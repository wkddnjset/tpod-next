import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider, useColorMode, useTheme } from '@chakra-ui/react';
import { mode } from 'styles/theme/foundations/colors';

import { withChakraProvider } from 'styles/provider';
import ToggleColorModeButton from 'components/common/ToggleColorModeButton';

import { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from 'features/store';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Create a client
const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: 'AIzaSyDYoZ0DLxlBtc2r8aWZplP5nQkD6TP8uzo',
  authDomain: 'docking-4df60.firebaseapp.com',
  projectId: 'docking-4df60',
  storageBucket: 'docking-4df60.appspot.com',
  messagingSenderId: '964669567898',
  appId: '1:964669567898:web:4116f292762abc7d240023',
  measurementId: 'G-6Y6T3L3VQX',
};

const app = initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  useEffect(() => {
    getAnalytics(app);
  }, []);

  return (
    // Provide the client to your App
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={{ ...theme, colors: { ...theme.colors, ...mode[colorMode] } }}>
          <ToggleColorModeButton />
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default withChakraProvider(MyApp);
