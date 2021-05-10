import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleSubmit() {

    if (!name)
      return Alert.alert('Me diz como te chamaremos 😢');

    try {
      AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    } catch {
      Alert.alert('Não foi possível salvar seu nome 😢');
    };
  };

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name);
  };

  function handleInputFocus(){
    setIsFocused(true);
  };

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.emoji}> 
                { isFilled ? '😄' : '😀' }
              </Text>

              <Text style={styles.title}>
                Como podemos {'\n'}
                chamar você?
              </Text>

              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]} 
                placeholder="Digite um nome" 
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}/>

              <View style={styles.footer}>
                <Button 
                  title="Confirmar"
                  onPress={handleSubmit}/>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 20,
    fontFamily: fonts.heading,
    lineHeight: 32
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
})