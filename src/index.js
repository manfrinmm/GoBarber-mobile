import React, { useEffect, Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";

import CodePush from "react-native-code-push";
import OneSignal from "react-native-onesignal";

import "~/config/reactotron";

import { store, persistor } from "~/store";
import App from "./App";

// class Index extends Component {
//   constructor(props) {
//     super(props);

//     OneSignal.init("5c949188-7181-4c23-8d34-570b4d7330f5");

//     OneSignal.addEventListener("received", this.onReceived);
//     OneSignal.addEventListener("opened", this.onOpened);
//     OneSignal.addEventListener("ids", this.onIds);
//   }

//   componentWillUnmount() {
//     OneSignal.removeEventListener("received", this.onReceived);
//     OneSignal.removeEventListener("opened", this.onOpened);
//     OneSignal.removeEventListener("ids", this.onIds);
//   }

//   //  Dispara quando o app estiver aberto
//   onReceived = data => {
//     console.tron.log(data);
//   };

//   //Dispara quando clica em uma notificação (cm app fechado) o app é aberto.
//   onOpened = notification => {};

//   //se registra no servirço de notificação
//   onIds = id => {};

//   render() {
//     return (
//       <Provider store={store}>
//         <PersistGate persistor={persistor}>
//           <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
//           <App />
//         </PersistGate>
//       </Provider>
//     );
//   }
// }

function Index() {
  useEffect(() => {
    //Dispara quando o app estiver aberto
    function onReceived(data) {
      // console.tron.log(data);
    }

    //Dispara quando clica em uma notificação (cm app fechado) o app é aberto.
    function onOpened(notification) {}

    //se registra no servirço de notificação
    function onIds() {}

    OneSignal.init("5c949188-7181-4c23-8d34-570b4d7330f5");
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);

    return () => {
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <App />
      </PersistGate>
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(Index);

/**
 * Updates:
 *  checkFrequency: CodePush.CheckFrequency.MANUAL -> Quem atualiza é o usuario (pode forçar ele att tbm)
 *  checkFrequency: CodePush.CheckFrequency.ON_APP_START -> Assim que o app é inicializado é att em background
 *  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME -> Identifica quando o app é utlizado ou não. Atualiza caso haja 10s ausente ou quando reiniciar o app
 *
 */
