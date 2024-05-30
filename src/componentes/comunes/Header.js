import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SerachBar from './SerachBar';

const Header = ({styleExt}) => {
  const [bus, setBus] = useState('');
  return (
    <View style={[style.head, styleExt]}>
      <SerachBar
        value={bus}
        setText={setBus}
        placeholder={'Buscar'}
        func={() => {
          console.log('si jalo');
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  head: {
    flexDirection: 'row',
    width: 332,
    gap: 18,
    marginTop: 15,
  },
});
export default Header;
