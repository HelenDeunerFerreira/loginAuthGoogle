import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { SignInContent } from "../../components/SignInContent";

import * as AuthGoogleSession from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { styles } from "./styles";

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const navigation = useNavigation();

  const [request, response, prompyAsync] = AuthGoogleSession.useAuthRequest({
    scopes: [
      "https://www.googleapis.com/auth/user.addresses.read",
      "https://www.googleapis.com/auth/user.birthday.read",
      "https://www.googleapis.com/auth/user.emails.read",
      "https://www.googleapis.com/auth/user.gender.read",
      "https://www.googleapis.com/auth/user.organization.read",
      "https://www.googleapis.com/auth/user.phonenumbers.read",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/admin.directory.user.readonly"
    ],
    expoClientId:
      "215958191274-gkpnm3ok9117ai86ji963g5kebh2js1g.apps.googleusercontent.com",
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  async function handleSignIn() {
    prompyAsync();
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      navigation.navigate("Profile", { token: authentication?.accessToken });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <SignInContent />

      <Button
        disabled={!request}
        title="Entrar com Google"
        icon="social-google"
        onPress={handleSignIn}
      />
    </View>
  );
}
