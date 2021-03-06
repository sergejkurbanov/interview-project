import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  createMuiTheme,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import blue from '@material-ui/core/colors/blue'
import amber from '@material-ui/core/colors/amber'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { setAxiosInterceptors } from 'helpers/axios'
import { store, persistor } from 'redux/store'
import 'react-toastify/dist/ReactToastify.css'
import 'typeface-roboto'
import App from 'components/App'

// Set up the defaults for our theme
const defaultTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: amber,
  },
  typography: {
    h1: { fontSize: 48 },
    h2: { fontSize: 36 },
    h3: { fontSize: 24 },
  },
})

// Inject store into axios interceptors
setAxiosInterceptors(store)

// Render the app
ReactDOM.render(
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <CssBaseline />
              <App />
              <ToastContainer hideProgressBar position="top-center" />
            </BrowserRouter>
          </PersistGate>
        </StoreProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>,
  document.getElementById('root'),
)
