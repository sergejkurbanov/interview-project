import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

// Set up our persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

// Initialize middlewares, enhances, reducers
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Export our store and persistor instances
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
)
export const persistor = persistStore(store)

// Run saga middleware
sagaMiddleware.run(rootSaga)
