import {View, Text, Button, Pressable, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppwriteContext} from '../context/AppWriteContext';

type UserObj = {
  name: string;
  email: string;
};

const UserData = () => {
  const [userData, setUserData] = useState<UserObj>();
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const handleLogout = () => {
    try {
      appwrite.logOutAccount();
      Alert.alert('Logout Successful', 'Success...');
    } catch (error) {
      console.log('Logout Error', error);
    }
  };

  useEffect(() => {
    appwrite.getCurrentUser().then(response => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email,
        };

        setUserData(user);
      }
    });
  }, [appwrite]);

  return (
    <View className="mt-4 p-3">
      {userData && (
        <View>
          <Text className="text-xl tracking-wider font-semibold">
            Name:
            <Text className="font-bold text-black capitalize">
              {userData.name}
            </Text>
          </Text>
          <Text className="text-xl tracking-wider font-semibold">
            Email:
            <Text className="font-bold text-black ">{userData.email}</Text>
          </Text>
          <Pressable
            className="bg-red-600 py-3 mt-4 rounded-xl"
            onPress={handleLogout}>
            <Text className="text-center text-xl font-bold text-white">
              Log Out
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UserData;
