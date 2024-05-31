/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Background from '../comunes/Background';
import Menu from '../cuerpo/Menu';
import Favoritos from '../cuerpo/Favoritos';
import Reservaciones from '../cuerpo/Reservaciones';
import MisProductos from '../cuerpo/MisProductos';
import {StyleSheet} from 'react-native';
import {Default_theme} from '../../constants';
import Perfil from '../cuerpo/Perfil';
import Perfil_Icon from '../comunes/Perfil_Icon';
import Icon from 'react-native-vector-icons/Ionicons';

const Bottom = createBottomTabNavigator();

const Fav = ({navigation}) => (
  <Background>
    <Favoritos navigation={navigation} />
  </Background>
);

const Res = ({navigation}) => (
  <Background>
    <Reservaciones navigation={navigation} />
  </Background>
);

const MisP = ({navigation}) => (
  <Background>
    <MisProductos navigation={navigation} />
  </Background>
);

const MenuP = ({navigation}) => (
  <Background>
    <Menu navigation={navigation} />
  </Background>
);

const BottomTap = () => {
  //sistema de navegacion de tipo BottomTap
  return (
    <Bottom.Navigator
      //opciones de la navegacion
      screenOptions={{
        headerShown: false,
        tabBarStyle: style.bottom,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: Default_theme.cuartario,
      }}>
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={40}
              color="#000"
            />
          ),
        }}
        name={'MenuInt'}
        component={MenuP}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'heart' : 'heart-outline'}
              size={40}
              color="#000"
            />
          ),
        }}
        name={'Favoritos'}
        component={Fav}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'file-tray' : 'file-tray-outline'}
              size={40}
              color="#000"
            />
          ),
        }}
        name={'Reservaciones'}
        component={Res}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'list' : 'list-outline'}
              size={40}
              color="#000"
            />
          ),
        }}
        name={'MisProductos'}
        component={MisP}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: () => <Perfil_Icon />,
        }}
        name={'Perfil'}
        component={Perfil}
      />
    </Bottom.Navigator>
  );
};

const style = StyleSheet.create({
  bottom: {
    backgroundColor: Default_theme.primary,
    height: 70,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default BottomTap;
