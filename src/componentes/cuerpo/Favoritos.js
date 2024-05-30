import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Producto from '../comunes/Producto';
import Regresar from '../comunes/Regresar';

//funcion que genera la lista de los favoritos (falta darle la info correcta[pendiente])
function favoritos(can) {
  let list_res = [];
  for (let i = 1; i <= can; i++) {
    list_res.push(
      <Producto
        producto={{id: '1', nombre: 'null', precio: '10.00'}}
        key={i}
        icon={'heart-outline'}
      />,
    );
  }
  return list_res;
}

const Favoritos = ({navigation}) => {
  return (
    <View>
      <View style={style.head}>
        <Regresar
          func={() => {
            navigation.goBack();
          }}
        />
        <Text style={style_txt.tit}>Favoritos</Text>
      </View>
      <ScrollView
        style={style.body}
        contentContainerStyle={style.body_cont}
        showsVerticalScrollIndicator={false}>
        {favoritos(2)}
      </ScrollView>
    </View>
  );
};

const style_txt = StyleSheet.create({
  tit: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    width: '70%',
    textAlign: 'center',
  },
});

const style = StyleSheet.create({
  head: {
    marginTop: 10,
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  body_cont: {
    alignItems: 'center',
    gap: 20,
  },
  body: {
    height: '80%',
  },
});

export default Favoritos;
