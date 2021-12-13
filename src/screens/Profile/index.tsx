import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ProfileHeader } from "../../components/ProfileHeader";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";

import { styles } from "./styles";
import { theme } from "../../styles/theme";

type Params = {
  token: string;
};

type Profile = {
  name: string,
  email: string,
  given_name: string,
  family_name: string,
  locale: string;
  picture: string;
}

export function Profile() {
  const [profile, setProfile] = useState({} as Profile);

  const navigation = useNavigation();
  const route = useRoute();

  const { token } = route.params as Params;

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`
    );

    const userInfo = await response.json();
    setProfile(userInfo);

    //`https://people.googleapis.com/v1/people/me?personFields=phoneNumbers&access_token=${token}`

    // const responseContact = await fetch(
    //   `https://www.googleapis.com/admin/directory/v1/users/userKey/phones`
    // );

    // const contact = await responseContact.json();

    // console.log(responseContact);

    //https://www.ti-enxame.com/pt/javascript/como-gravar-dados-em-um-arquivo-json-usando-javascript/1055739192/
    //https://www.visualdicas.com.br/programacao/js/83-como-ler-e-obter-dados-de-um-arquivo-json-com-javascript
    //https://qastack.com.br/programming/36856232/write-add-data-in-json-file-using-node-js
    //https://groups.google.com/g/jquery-br/c/urmUjT9fox0

    // console.log('user info - ', JSON.stringify(contact))

    console.log('user info - ', userInfo);
  }

  async function handleLogout() {
    navigation.navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />

      <View style={styles.content}>
        <View style={styles.profile}>
          <Avatar source={{ uri: profile.picture }} />

          <Text style={styles.name}>{profile.name}</Text>

          <View style={styles.email}>
            <Feather name="mail" color={theme.colors.secondary} size={18} />
            <Text style={styles.emailText}>
              {profile.email}
            </Text>
          </View>
        </View>

        <View style={styles.about}>
          <View style={styles.info}>
            <Feather name="user" size={34} color={theme.colors.note} />
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.text}>{profile.given_name}</Text>
          </View>

          <View style={styles.info}>
            <Feather name="heart" size={34} color={theme.colors.note} />
            <Text style={styles.label}>Sobrenome</Text>
            <Text style={styles.text}>{profile.family_name}</Text>
          </View>
        </View>

        <View style={styles.locale}>
          <Feather name="map-pin" size={18} color={theme.colors.note} />

          <Text style={styles.localeText}>
            Localidade do perfil do usuário: {profile.locale}
          </Text>
        </View>

        <Button title="Desconectar" icon="power" onPress={handleLogout} />
      </View>
    </View>
  );
}
