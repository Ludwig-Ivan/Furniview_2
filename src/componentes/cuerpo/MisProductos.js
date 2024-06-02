/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Producto from '../comunes/Producto';
import Regresar from '../comunes/Regresar';
import {JsonInfo} from '../../constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carga from '../comunes/Carga';

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
  const [list, setList] = useState(['']);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [vis, setVis] = useState(true);

  async function setOp(op) {
    try {
      await AsyncStorage.setItem('Op', op);
      await AsyncStorage.setItem('inicialRoute', 'NuevoProducto');
      navigation.navigate('NuevoProducto');
    } catch (error) {
      console.error(error);
    }
  }

  async function setIdProd(idprod) {
    try {
      await AsyncStorage.setItem('idProducto', JSON.stringify(idprod));
    } catch (error) {
      console.log(error);
    }
  }

  const productos = async () => {
    let list_res = [];
    let prods;
    let i = 0;
    try {
      prods = (
        await axios.get(`https://${JsonInfo.ip}/productos/cliente/${id}`)
      ).data;
    } catch (error) {}

    prods.forEach(element => {
      list_res.push(
        <Producto
          func={BorrarProd}
          key={i}
          func2={() => {
            setOp('Editar');
            setIdProd(element.id);
          }}
          icon={'trash-outline'}
          producto={element}
        />,
      );
      i += 1;
    });

    setList(list_res);
  };

  const getIdCli = async () => {
    const item = await AsyncStorage.getItem('idCliente');
    setId(JSON.parse(item));
  };

  useEffect(() => {
    getIdCli();
    productos();
    setLoading(false);
  }, [id]);

  const onRefresh = () => {
    setRefreshing(true);
    productos();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Carga visible={vis} setVis={setVis} time={200} />
      <View style={style.head}>
        <Regresar
          func={() => {
            navigation.goBack();
          }}
        />
        <Text style={style_txt.tit}>Mis Productos</Text>
        <Pressable
          onPress={() => {
            setOp('Nuevo');
          }}>
          <Icon name={'add-circle-outline'} color={'#000'} size={45} />
        </Pressable>
      </View>
      <ScrollView
        style={style.body}
        contentContainerStyle={style.body_cont}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {list}
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
