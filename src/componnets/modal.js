import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {LIST_URL} from '../constant';

export default function modal({visible, submit}) {
  const [currencies, setCurrencies] = useState({});
  const [visibleOptions, setVisibleOptions] = useState([]);
  useEffect(() => {
    if (visible === false) {
      setVisibleOptions(Object.entries(currencies));
    }
  }, [visible]);
  useEffect(() => {
    (async _ => {
      try {
        const response = await fetch(LIST_URL);
        const json = await response.json();
        console.log('json', json);
        setCurrencies(json.currencies);
        setVisibleOptions(Object.entries(json.currencies));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const renderItem = item => {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => submit(item[0])}>
          <Text style={{marginHorizontal: 10}}>{item[0]}</Text>
          <Text>{item[1]}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  function onchange(text) {
    setVisibleOptions(
      Object.entries(currencies).filter(([_, ele]) =>
        ele.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  }
  return (
    <View>
      <Modal
        animationType={'slide'}
        transparent={true}
        style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
        visible={visible}>
        <View style={styles.container}>
          <TextInput
            placeholder="Search"
            style={styles.input}
            autoFocus
            onChangeText={text => onchange(text)}
          />
          <FlatList
            data={visibleOptions}
            renderItem={({item}) => renderItem(item)}
          />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
  },
  container: {
    backgroundColor: '#b3b3b3',
    height: '70%',
    top: '30%',
    width: '100%',
    marginTop: 50,
    padding: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
  },
});
