import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import React, { useContext, useState } from 'react';
import { AppwriteContext } from '../context/AppWriteContext';

const Login = () => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    appwrite
      .loginAccount(user)
      .then((response: any) => {
        if (response) {
          setIsLoggedIn(true);
          Alert.alert('Login Successful', 'Success');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View className="mt-12">
      <Text className=" text-center py-2 text-xl font-bold bg-sky-400">
        Appwrite Auth - Login
      </Text>

      <View className="p-2 flex justify-center items-center w-full">
        <View className="flex w-full gap-3 justify-center items-center">
          <TextInput
            value={email}
            keyboardType="email-address"
            onChangeText={text => {
              setEmail(text);
            }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Email"
            className=" text-left border w-full rounded-xl text-xl font-bold pl-3"
          />

          <TextInput
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Password"
            secureTextEntry
            className=" text-left border w-full rounded-xl text-xl font-bold pl-3"
          />
        </View>

        <Pressable
          onPress={handleLogin}
          className="mt-5 py-3 bg-blue-600 w-full rounded-xl">
          <Text className="text-center text-white font-bold text-xl ">
            Log In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
