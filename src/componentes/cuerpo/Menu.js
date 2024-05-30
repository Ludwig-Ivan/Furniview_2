import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../comunes/Header';
import Categoria from '../comunes/Categoria';
import Etiqueta from '../comunes/Etiqueta';
import {Categorias} from '../../constants';
import Carga from '../comunes/Carga';

//funcion que genera la lista de etiquetas que se deseen (debe recibir las etiquetas y procesarlas[pendiente])
function etiquetas(can) {
  let list_etq = [];
  for (let i = 0; i < can; i++) {
    list_etq.push(<Etiqueta key={i} styleExt={style.etiq} />);
  }
  return list_etq;
}

//funcion que genera la lista de categorias que se desean en base a las categorias existentes
function categorias(list_cat, func) {
  let list = [];
  for (let i = 0; i < list_cat.length; i++) {
    list.push(
      <Categoria cat={list_cat[i]} func={func} key={i} styleExt={style.cat} />,
    );
  }
  return list;
}

//Menu donde se agrupan todos los elementos de la vista (recibe el id)
const Menu = ({navigation, id}) => {
  const [vis, setVis] = useState(true);
  function Nav(idp) {
    navigation.navigate('Producto', {idp});
  }

  //lista de las categorias obtenidas
  return (
    <View>
      <Carga visible={vis} setVis={setVis} time={200} />
      <Header styleExt={style.head} />
      <ScrollView style={style.body}>
        <ScrollView
          style={style.etiqs}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {etiquetas(4)}
        </ScrollView>
        <View style={style.cont_cat}>{categorias(Categorias, Nav)}</View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  etiqs: {
    marginBottom: 20,
    minHeight: 45,
  },
  body: {
    paddingLeft: 15,
  },
  etiq: {
    marginRight: 10,
  },
  cat: {
    marginBottom: 20,
  },
  cont_cat: {
    paddingBottom: 190,
  },
  head: {
    paddingBottom: 20,
    alignSelf: 'center',
  },
});

export default Menu;
