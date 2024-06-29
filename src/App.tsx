import {KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import {AppWriteProvider, AppwriteContext} from './context/AppWriteContext';
import SignUp from './components/SignUp';
import Login from './components/Login';

export default function App() {
  return (
    <AppWriteProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SignUp />
        <Login />
      </KeyboardAvoidingView>
    </AppWriteProvider>
  );
}
