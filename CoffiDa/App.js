import * as React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Index from './src/index'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'tomato'
  }
}

export default function Main () {
  return (
    <PaperProvider theme={theme}>
      <Index />
    </PaperProvider>
  )
}
