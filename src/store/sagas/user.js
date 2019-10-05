import { Alert } from "react-native";
import { put, call } from "redux-saga/effects";

import api from "~/services/api";

import UserActions from "../ducks/user";

export function* setUser({ user }) {
  yield put(UserActions.setUser(user));
  // history.push("/dashboard");
}

export function* updateProfile({ data }) {
  const { name, email, ...rest } = data;
  try {
    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, "users", profile);

    yield put(UserActions.updateProfileSuccess(response.data));

    Alert.alert("Sucesso!", "Perfil atualizado com sucesso");
  } catch (error) {
    Alert.alert("Erro ao atualizar perfil", "Confira seus dados!");
    yield put(UserActions.updateProfileFailure());
  }
}
