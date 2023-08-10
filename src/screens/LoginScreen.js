import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import {_axios} from "../utils/_axios";
import {getToken, saveSession, saveToken} from "../utils/common";

export default function LoginScreen({ navigation }) {
  const [Username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })


  const onLoginPressed = () => {
    const UsernameError = nameValidator(Username.value)
    const passwordError = passwordValidator(password.value)
    if (UsernameError || passwordError) {
      setUsername({ ...Username, error: UsernameError })
      setPassword({ ...password, error: passwordError })
      return
    }

    console.log(Username);
  console.log(password);

    let formObject = {
      username: Username.value,
      password: password.value,
    };
    _axios.post('/api/v1/auth/login/', formObject).then(response => {
      if (response.status !== 200) {
        console.log(response.error);
      } else {
        console.log(response.data.access_token);
        saveSession(response.data.access_token, response.data.role, response.data.user)
        navigation.navigate('Home');

        // navigate("/training");
      }
    });
    /*navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })*/
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Tamu Patisserie</Header>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={Username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!Username.error}
        errorText={Username.error}
        autoCapitalize="none"
        autoCompleteType="Username"
        textContentType="Username"
        keyboardType="Username"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
