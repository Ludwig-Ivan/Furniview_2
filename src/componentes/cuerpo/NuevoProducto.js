/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Regresar from '../comunes/Regresar';
import Seccion from '../comunes/Seccion';
import {Categorias, Default_theme, Furnitures, JsonInfo} from '../../constants';
import axios from 'axios';
import validator from 'validator';
import RNPickerSelect from 'react-native-picker-select';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

async function imageLaunch() {
  try {
    const res = await launchImageLibrary();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

//Valida que al editar o agregar uno nuevo sea de manera correcta

//Genera la lista de categorias para RNPickerSelect
function List_Item(categorias) {
  let list = [];
  for (let i = 0; i < categorias.length; i++) {
    list.push({
      label: categorias[i],
      value: categorias[i],
    });
  }
  return list;
}

const NuevoProducto = ({navigation, route}) => {
  const {id, op} = route.params;
  const [prod, setProd] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState(0);
  const [peso, setPeso] = useState('');
  const [cat, setCat] = useState('');
  const [suc, setSuc] = useState('');
  const [dir, setDir] = useState('');
  const [des, setDes] = useState('');
  const [img, setImg] = useState(Furnitures.furniture12);

  async function NuevoProduct() {
    try {
      await axios.post(`https://${JsonInfo.ip}/productos`, {
        nombre: prod,
        peso: peso,
        precio: precio,
        descripcion: des,
        categoria: cat,
        sucursal: suc,
        direccion: dir,
        idcliente: id,
      });
      console.log('Producto agregado con exito');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  async function EditarProduct() {
    try {
      await axios.put(`https://${JsonInfo.ip}/productos/${id}`, {
        nombre: prod,
        peso: peso,
        precio: precio,
        descripcion: des,
        categoria: cat,
        sucursal: suc,
        direccion: dir,
      });
      console.log('Producto editado con exito');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  function ValidarNuevo() {
    console.log(
      validator.isAlpha(prod),
      validator.isFloat(peso),
      validator.isFloat(precio + ''),
    );
    return (
      validator.isAlpha(prod) &&
      validator.isFloat(peso) &&
      validator.isFloat(precio + '')
    );
  }

  useEffect(() => {
    async function ObtProducto() {
      try {
        const producto = (
          await axios.get(`https://${JsonInfo.ip}/productos/${id}`)
        ).data;
        setProd(producto.nombre);
        setFecha(producto.fechacreacion);
        setPrecio(producto.precio);
        setCat(producto.categoria);
        setPeso(producto.peso);
        setSuc(producto.sucursal);
        setDir(producto.direccion);
        setDes(producto.descripcion);
      } catch (error) {
        console.error(error);
      }
    }
    if (op === 'Editar') {
      ObtProducto();
      console.log('ejecuto');
    }
  }, [op]);

  return (
    <View>
      <View style={style.head}>
        <Regresar
          func={() => {
            navigation.goBack();
          }}
        />
        <Text style={style_txt.tit}>{op} Producto</Text>
        <Pressable
          onPress={() => {
            if (ValidarNuevo()) {
              if (op === 'Nuevo') {
                NuevoProduct();
              } else {
                EditarProduct();
              }
            } else {
              console.error('Campos incorrectos');
            }
          }}>
          <Icon name={'checkmark-circle-outline'} size={40} color={'#000'} />
        </Pressable>
      </View>
      <ScrollView
        style={style.body}
        contentContainerStyle={style.body_cont}
        showsVerticalScrollIndicator={false}>
        <View style={style.form_con}>
          <Pressable onPress={imageLaunch}>
            <Image style={style.img} source={img} />
          </Pressable>
          <View style={style.form}>
            <TextInput
              maxLength={30}
              multiline
              style={style_txt.prod}
              placeholder="Producto"
              placeholderTextColor={'#000'}
              value={prod}
              onChangeText={text => {
                setProd(text);
              }}
            />
            {op !== 'Nuevo' ? (
              <TextInput
                maxLength={10}
                placeholder="Fecha"
                placeholderTextColor={'#000'}
                value={fecha}
                editable={false}
                onChangeText={text => {
                  setFecha(text);
                }}
              />
            ) : (
              <View />
            )}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={
                  (style_txt.pre,
                  {color: '#000', fontSize: 18, paddingBottom: 2})
                }>
                $
              </Text>
              <TextInput
                style={style_txt.pre}
                maxLength={10}
                placeholder="Precio"
                placeholderTextColor={'#000'}
                value={precio + ''}
                onChangeText={text => {
                  setPrecio(Number(text) ? Number(text) : 0);
                }}
              />
            </View>
          </View>
        </View>
        <View style={style.desc}>
          <Text style={style_txt.title_des}>Descripcion</Text>
          <TextInput
            style={style_txt.desc}
            multiline
            numberOfLines={5}
            maxLength={200}
            placeholder="Escribe tu descripcion aqui"
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            value={des}
            onChangeText={text => {
              setDes(text);
            }}
          />
        </View>
        <Seccion
          value={peso}
          setText={setPeso}
          edit={true}
          icon={'barbell'}
          titulo={'Peso'}
        />
        <View style={style.pick}>
          <Text style={style_txt.title_des}>Categoria</Text>
          <RNPickerSelect
            style={{
              placeholder: {color: '#000'},
              viewContainer: {borderBottomWidth: 1},
            }}
            onValueChange={text => setCat(text)}
            value={cat}
            items={List_Item(Categorias)}
            placeholder={{label: 'Seleccion una opcion', value: null}}
          />
        </View>
        <Seccion
          value={suc}
          icon={'storefront'}
          setText={setSuc}
          edit={true}
          titulo={'Sucursal'}
        />
        <Seccion
          value={dir}
          setText={setDir}
          edit={true}
          icon={'business'}
          titulo={'Direccion'}
        />
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
  prod: {
    fontSize: 18,
    fontWeight: '900',
  },
  pre: {
    fontSize: 16,
    fontWeight: '900',
  },
  desc: {
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  title_des: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
  },
});

const style = StyleSheet.create({
  head: {
    marginTop: 10,
    flexDirection: 'row',
    marginRight: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  body_cont: {
    alignItems: 'center',
    gap: 20,
    paddingBottom: 300,
  },
  body: {
    height: '80%',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  form_con: {
    flexDirection: 'row',
  },
  form: {
    height: 150,
    minWidth: 150,
    maxWidth: 160,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingLeft: 20,
  },
  desc: {
    width: 300,
    minHeight: 60,
    backgroundColor: Default_theme.primary,
    padding: 20,
    borderRadius: 20,
  },
  pick: {
    width: 300,
    backgroundColor: Default_theme.primary,
    borderRadius: 20,
    padding: 20,
  },
});
export default NuevoProducto;
