/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Principal from './src/componentes/introduccion/Principal';
import Ingresar from './src/componentes/introduccion/Ingresar';
import Registrarse from './src/componentes/introduccion/Registrarse';
import Producto from './src/componentes/cuerpo/Producto';
import BottomTap from './src/componentes/navigations/BottomTap';
import NuevoProducto from './src/componentes/cuerpo/NuevoProducto';
import Background from './src/componentes/comunes/Background';
import Welcome from './src/componentes/introduccion/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Default_theme} from './src/constants';

const Stack = createStackNavigator();

const NuevoProduct = ({navigation, route}) => (
  <Background>
    <NuevoProducto navigation={navigation} route={route} />
  </Background>
);

const Welcome_Screen = ({navigation}) => (
  <Background>
    <Welcome navigation={navigation} />
  </Background>
);

//* Sistema de navegacion principal tipo Stack
const App = () => {
  const [inicialRoute, setInicialRoute] = useState('Welcome');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setRoute();
    getIniciaRoute();
  }, []);

  const setRoute = async () => {
    try {
      //! Recuperacion de ruta
      //await AsyncStorage.setItem('inicialRoute', 'Menu');
      console.log(await AsyncStorage.getAllKeys());
      console.log(
        'ruta inicial: ' + (await AsyncStorage.getItem('inicialRoute')),
      );
    } catch (error) {}
  };

  const getIniciaRoute = async () => {
    try {
      const item = await AsyncStorage.getItem('inicialRoute');
      setInicialRoute(item);
      setLoading(false);
    } catch (error) {}
  };

  if (loading) {
    return <View style={{backgroundColor: Default_theme.primary, flex: 1}} />;
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={{flex: 1}}>
          <Stack.Navigator
            id="StackNavigator"
            initialRouteName={inicialRoute}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={Welcome_Screen} />
            <Stack.Screen name="Principal" component={Principal} />
            <Stack.Screen name="Ingresar" component={Ingresar} />
            <Stack.Screen name="Registrarse" component={Registrarse} />
            <Stack.Screen name="Menu" component={BottomTap} />
            <Stack.Screen name="Producto" component={Producto} />
            <Stack.Screen name="NuevoProducto" component={NuevoProduct} />
          </Stack.Navigator>
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
