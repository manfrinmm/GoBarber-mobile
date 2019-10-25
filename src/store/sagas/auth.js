import { Alert } from "react-native";
import { call, put } from "redux-saga/effects";
import api from "~/services/api";

import { signInSuccess, signFailure } from "../ducks/auth/actions";

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export function* signIn({ email, password }) {
  try {
    const { data } = yield call(api.post, "sessions", {
      email,
      password
    });

    const { token, user } = data;

    if (user.provider) {
      Alert.alert("Erro no login", "Usuário é um provider");
      return;
    }

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // history.push("/dashboard");
  } catch (error) {
    Alert.alert("Falha na autenticação", "Verifique seus dados!");
    yield put(signFailure());
  }
}

export function* signUp({ name, email, password }) {
  try {
    yield call(api.post, "users", {
      name,
      email,
      password
    });
    Alert.alert("Cadastro", "Usuário criado com sucesso!");

    // history.push("/");
  } catch (error) {
    Alert.alert("Falha no cadastro", "Verifique seus dados!");

    yield put(signFailure());
  }
}

export function singOut() {
  // history.push("/");'
}
