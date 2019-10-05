import { persistStore } from "redux-persist";
import persistReducers from "./persistReducers";

import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// const sagaMonitor =
//   __DEV__ === "development" ? console.tron.createSagaMonitor() : null;

// const composer =
//   __DEV__ === "development"
//     ? compose(
//         applyMiddleware(...middlewares),
//         console.tron.createEnhancer()
//       )
//     : compose(applyMiddleware(...middlewares));

/**/

import reducers from "./ducks";
import sagas from "./sagas";

const middlewares = [];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer()
    )
  : compose(applyMiddleware(...middlewares));

const store = createStore(persistReducers(reducers), composer);

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
