/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Default_theme, Imagenes} from '../../constants';
import {Modal, Portal, ProgressBar} from 'react-native-paper';

const Carga = ({visible, setVis, time}) => {
  const [niv, setNiv] = useState(0);
  setTimeout(
    () => {
      setNiv(niv + 0.2);
      if (niv === 1) {
        setVis(false);
      }
    },
    time ? time : 1000,
  );
  return (
    <Portal>
      <Modal visible={visible} style={style.body}>
        <Image
          resizeMethod="scale"
          resizeMode="center"
          style={style.logo}
          source={Imagenes.logo}
        />
        <ProgressBar
          style={{width: 240}}
          progress={niv}
          color={Default_theme.secundario}
        />
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  body: {
    backgroundColor: Default_theme.primary,
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 100,
  },
});

export default Carga;
