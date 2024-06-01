/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

const Image_Prod = ({vm, setVM, img}) => {
  return (
    <Portal>
      <Modal
        visible={vm}
        onDismiss={() => {
          setVM(false);
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={style.content}>
          <Image style={style.img} source={img} />
        </View>
      </Modal>
    </Portal>
  );
};
const style = StyleSheet.create({
  content: {
    width: '100%',
  },
  img: {
    width: '100%',
    maxHeight: 400,
    height: 400,
  },
});
export default Image_Prod;
