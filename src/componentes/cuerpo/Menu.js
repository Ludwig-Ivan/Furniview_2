/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../comunes/Header';
import Etiqueta from '../comunes/Etiqueta';
import {Categorias, JsonInfo} from '../../constants';
import Carga from '../comunes/Carga';
import axios from 'axios';
import Categoria from '../comunes/Categoria';

//funcion que genera la lista de etiquetas que se deseen (debe recibir las etiquetas y procesarlas[pendiente])
function etiquetas(list) {
  let list_etq = [];
  let i = 0;

  list.forEach(element => {
    list_etq.push(<Etiqueta text={element} key={i} styleExt={style.etiq} />);
    i += 1;
  });

  return list_etq;
}

//Menu donde se agrupan todos los elementos de la vista (recibe el id)
const Menu = ({navigation}) => {
  const [listcat, setListCat] = useState(['']);
  const [refreshing, setRefreshing] = useState(false);
  const [bus, setBus] = useState('');

  //* funcion encargada de buscar los productos con el mismo nombre
  async function serchProductos() {
    try {
      let list = [];

      const productos = (
        await axios.get(`https://${JsonInfo.ip}/productos/producto/${bus}`)
      ).data;

      list.push(
        <Categoria
          title={bus}
          cat={productos}
          func={Nav}
          key={1}
          styleExt={style.cat}
        />,
      );

      setListCat(list);
    } catch (error) {
      console.error(error);
    }
  }

  //* funcion encargada de generar las categorias y sus items
  const categorias = async () => {
    let list = [];
    let cat;

    for (let i = 0; i < Categorias.length; i++) {
      try {
        cat = (
          await axios.get(
            `https://${JsonInfo.ip}/productos/categoria/${Categorias[i]}`,
          )
        ).data;
      } catch (error) {
        console.error(error);
      }
      list.push(
        <Categoria
          title={Categorias[i]}
          cat={cat}
          func={Nav}
          key={i}
          styleExt={style.cat}
        />,
      );
    }
    setListCat(list);
  };

  //* useEffect que genera las categorias al crearse la vista
  useEffect(() => {
    categorias();
  }, []);

  //* funcion para refrescar el menu de los productos
  const onRefresh = () => {
    setRefreshing(true);
    categorias();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const [vis, setVis] = useState(true);

  //* funcion para navegacion a la ventana del producto indicado
  function Nav(idp) {
    navigation.navigate('Producto', {idp});
  }

  return (
    <View>
      <Carga visible={vis} setVis={setVis} time={200} />
      <Header
        styleExt={style.head}
        bus={bus}
        setBus={setBus}
        func={() => {
          serchProductos();
        }}
      />
      <ScrollView
        style={style.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ScrollView
          style={style.etiqs}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {etiquetas(['Barato', 'Calidad', 'Precio'])}
        </ScrollView>
        <View style={style.cont_cat}>{listcat}</View>
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
