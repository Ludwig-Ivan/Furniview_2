/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Default_theme, Furnitures, Imagenes} from '../../constants';
import Seccion_2 from '../comunes/Seccion_2';
import Regresar from '../comunes/Regresar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function secciones(can) {
  let list_sec = [];
  for (let i = 0; i < can; i++) {
    list_sec.push(<Seccion_2 styleExt={style.sec} key={i} />);
  }
  return list_sec;
}

async function ResetId() {
  try {
    await AsyncStorage.setItem('idCliente', JSON.stringify(0));
    await AsyncStorage.setItem('inicialRoute', 'Welcome');
  } catch (error) {}
}

const Perfil = ({navigation, fondo, perfil}) => {
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  const getIdCli = async () => {
    const item = await AsyncStorage.getItem('idCliente');
    setId(JSON.parse(item));
  };

  useEffect(() => {
    getIdCli();
    setLoading(false);
  }, []);

  if (loading) {
    return <View style={{backgroundColor: Default_theme.primary, flex: 1}} />;
  }

  return (
    <ScrollView style={style.scroll}>
      <Image
        style={style.img}
        source={fondo ? fondo : Furnitures.furniture10}
      />
      <View style={style.cont}>
        {secciones(2)}
        <Pressable
          onPress={() => {
            ResetId();
            navigation.getParent('StackNavigator').reset({
              index: 0,
              routes: [{name: 'Principal'}],
            });
          }}
          style={style.btn}>
          <Text style={style_txt.btn_text}>CERRAR SESION</Text>
        </Pressable>
        <View style={style.cont_perfil}>
          <Image
            style={style.perfil}
            source={perfil ? perfil : Imagenes.perfil}
          />
        </View>
      </View>
      <Regresar
        func={() => {
          navigation.goBack();
        }}
        styleExt={style.back}
      />
      <View style={style_txt.perf}>
        <Text style={style_txt.perf_txt}>Perfil: {id}</Text>
      </View>
      <Text style={style_txt.edit}>Editar</Text>
    </ScrollView>
  );
};

const style_txt = StyleSheet.create({
  perf: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 40,
  },
  edit: {
    position: 'absolute',
    right: 15,
    top: 15,
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  perf_txt: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
  },
  btn_text: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '900',
  },
});

const style = StyleSheet.create({
  back: {
    position: 'absolute',
    top: 15,
  },
  img: {
    width: '100%',
    minHeight: 280,
  },
  cont: {
    top: -100,
    alignItems: 'center',
    width: '100%',
    minHeight: 640,
    height: '100%',
    backgroundColor: Default_theme.primary,
    paddingTop: 80,
  },
  cont_perfil: {
    position: 'absolute',
    backgroundColor: Default_theme.primary,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    top: -80,
  },
  perfil: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  sec: {
    width: '100%',
  },
  btn: {
    backgroundColor: 'rgba(255,0,0,0.6)',
    width: '90%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default Perfil;
