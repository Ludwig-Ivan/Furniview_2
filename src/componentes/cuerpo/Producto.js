/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import furnitures from '../../constants/furnitures';
import Regresar from '../comunes/Regresar';
import Lista_Colores from '../comunes/Lista_Colores';
import Seccion from '../comunes/Seccion';
import {Default_theme, JsonInfo} from '../../constants';
import BottomTap from '../comunes/BottomTap';
import Image_Prod from './ImageProd';
import axios from 'axios';

//funcion que genera la lista de seccion para informacion (falta que leea la info[pendiente])
function Info(list, list_sec) {
  let list_info = [];
  for (let i = 0; i < list.length; i++) {
    list_info.push(
      <Seccion value={list_sec[i]} edit={false} titulo={list[i]} key={i} />,
    );
  }
  return list_info;
}
//funcion asincrona que devuelve la categoria indicada
async function obtenerProd(id, setProd, setCli) {
  try {
    const producto = (
      await axios.get(`http://${JsonInfo.ip}/productos/${id.idp}`)
    ).data;
    const cliente = (
      await axios.get(`https://${JsonInfo.ip}/clientes/${producto.idcliente}`)
    ).data;
    setCli(cliente);
    setProd(producto);
  } catch (error) {
    console.log(error);
  }
}

const Producto = ({navigation, route}) => {
  //se obtiene el producto indicado para mostrarlo
  const [prod, setProd] = useState({});
  const [cli, setCli] = useState({});

  useEffect(() => {
    obtenerProd(route.params, setProd, setCli);
  }, [route.params]);
  const [vm, setVM] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Image_Prod img={furnitures.furniture13} vm={vm} setVM={setVM} />
      <ScrollView showsVerticalScrollIndicator={false} style={style.body}>
        <Pressable
          onPress={() => {
            setVM(true);
          }}
          style={style.img}>
          <Image style={style.img} source={furnitures.furniture13} />
        </Pressable>
        <Regresar
          func={() => {
            navigation.goBack();
          }}
          styleExt={style.back}
        />
        <View style={style.cont}>
          <Text style={style_txt.prod}>{prod.nombre}</Text>
          <Text style={style_txt.color_tit}>Color</Text>
          <Lista_Colores
            colores={{
              color1: '#ED4848',
              color2: '#4880ED',
              color3: '#4BED48',
              color4: '#EDDC48',
            }}
          />
          <Text style={style_txt.desc_tit}>Descripcion</Text>
          <Text style={style_txt.desc}>
            {prod.descripcion}
            <Text style={style_txt.ver}>Ver Mas</Text>
          </Text>
          {Info(
            [
              'Peso',
              'Fecha de creacion',
              'Categoria',
              'Sucursal',
              'Direccion',
              'Cliente',
            ],
            [
              prod.peso,
              prod.fechacreacion,
              prod.categoria,
              prod.sucursal,
              prod.direccion,
              cli.usuario,
            ],
          )}
        </View>
      </ScrollView>
      <BottomTap precio={prod.precio} styleExt={style.bottomtap} />
    </View>
  );
};
const style_txt = StyleSheet.create({
  prod: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
  desc_tit: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  desc: {
    fontSize: 12,
    color: '#000',
  },
  color_tit: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  ver: {
    fontSize: 12,
    color: '#000',
    fontWeight: '900',
  },
});

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  img: {
    width: '100%',
    minHeight: 330,
  },
  back: {
    position: 'absolute',
    top: 20,
  },
  cont: {
    backgroundColor: Default_theme.primary,
    top: -80,
    height: '100%',
    minHeight: 346,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 15,
    gap: 20,
  },
  bottomtap: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Producto;
