import React, {Component} from 'react';
import {PaperProvider} from 'react-native-paper';
import {DarkTheme, DefaultTheme} from './Themes';

const Context = React.createContext();

export class AppContextProvider extends Component {
  state = {
    theme: DefaultTheme,
    updateTheme: (theme) => {
      this.setState({theme});
    },
  };

  render() {
    const {theme} = this.state;
    return (
      <Context.Provider value={this.state}>
        <PaperProvider theme={theme}>
          {' '}
          // Setting our theme
          {this.props.children}
        </PaperProvider>
      </Context.Provider>
    );
  }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;
