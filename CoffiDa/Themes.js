import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#E0A655',
    accent: '#997542',
    background: '#E0605E',
    text: '#FFFFFF',
    surface: '#E0A655',
    card: '#E0A655',
    placeholder: '#FFFFFF',
  },
};

const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    surface: '#BB86FC',
  },
};
