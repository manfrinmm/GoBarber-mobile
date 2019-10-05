import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
// import DeviceInfo from "react-native-localize";
import * as DeviceInfo from "react-native-localize";

import Icon from "react-native-vector-icons/MaterialIcons";

import api from "~/services/api";

import Background from "~/components/Background";
import DateInput from "~/components/DateInput";

import { Container, HourList, Hour, Title } from "./styles";

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam("provider");

  useEffect(() => {
    // console.log("date.getTime()");
    // console.log(date.getTime());
    const timezone = DeviceInfo.getTimeZone();
    // console.log(timezone);
    async function loadAvailable() {
      const { data } = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
          timezone: DeviceInfo.getTimeZone(),
          currentDate: new Date()
        }
      });
      // console.log(data);

      setHours(data);
    }

    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate("Confirm", { provider, time });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: "Selecione o horário",
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  )
});
