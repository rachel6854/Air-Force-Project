import React, { FC } from 'react';
import PetsLayer from './components/PetsLayer/PetsLayer';
import { ApolloProvider } from '@apollo/react-hooks';
import { getClient } from './graphql/graphql-client/graphql-client';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#498828',
    },
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={getClient()}>
        <div className="App">
          <PetsLayer />
        </div>
      </ApolloProvider>

    </ThemeProvider>
  );
};

export default App;
