import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import Producto from '../comunes/Producto';
import Regresar from '../comunes/Regresar';
import {JsonInfo} from '../../constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//funcion que genera la lista de productos (obtener la info de la db y generar la lista[pendiente])
function productos(list, navigation) {
  let list_res = [];
  for (let i = 0; i < list.length; i++) {
    //se genera la lista de componentes producto en base a los productos obtenidos de la db.json
    list_res.push(
      <Producto
        func={BorrarProd}
        key={i}
        func2={() => {
          navigation.navigate('NuevoProducto', {id: list[i].id, op: 'Editar'});
        }}
        icon={'trash-outline'}
        producto={list[i]}
      />,
    );
  }
  return list_res;
}

//funcion asincrona que obtiene la informacion de los productos
async function ObtenerProd(id, setList) {
  try {
    const prods = (
      await axios.get(`https://${JsonInfo.ip}/productos/cliente/${id}`)
    ).data;
    setList(prods);
  } catch (error) {}
}

//funcion asincrona que elimina los productos de la db.json
async function BorrarProd(id) {
  try {
    await axios
      .delete(`https://${JsonInfo.ip}/productos/${id}`)
      .then(console.log('Producto Eliminado'));
  } catch (error) {
    console.error(error);
  }
}

const MisProductos = ({navigation}) => {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  const getIdCli = async () => {
    const item = await AsyncStorage.getItem('idCliente');
    setId(JSON.parse(item));
  };

  useEffect(() => {
    getIdCli();
    setLoading(false);
    ObtenerProd(id, setList);
  }, [id]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={style.head}>
        <Regresar
          func={() => {
            navigation.goBack();
          }}
        />
        <Text style={style_txt.tit}>Mis Productos</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('NuevoProducto', {id: id, op: 'Nuevo'});
          }}>
          <Icon name={'add-circle-outline'} color={'#000'} size={45} />
        </Pressable>
      </View>
      <ScrollView
        style={style.body}
        contentContainerStyle={style.body_cont}
        showsVerticalScrollIndicator={false}>
        {productos(list, navigation)}
      </ScrollView>
    </View>
  );
};

const style_txt = StyleSheet.create({
  tit: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
});

const style = StyleSheet.create({
  head: {
    marginTop: 10,
    flexDirection: 'row',
    marginRight: 15,
    justifyContent: 'space-between',
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
  icon: {
    height: 35,
    width: 35,
    transform: [{rotate: '45deg'}],
  },
});

export default MisProductos;
