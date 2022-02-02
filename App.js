import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Modal from './src/componnets/modal';
import {LIVE_URL} from './src/constant';
export default function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [quotes, setQuotes] = useState({});
  const [modalSubmitFn, setModalSubmitFn] = useState(() => () => {});
  const [result, setResult] = useState(0);
  useEffect(() => {
    const fromVal = quotes[`USD${from}`];
    const toVal = quotes[`USD${to}`];
    setResult((toVal / fromVal) * amount || 0);
  }, [to, from, amount]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    (async _ => {
      try {
        const response = await fetch(LIVE_URL);
        const json = await response.json();
        console.log('live', json);
        setQuotes(json.quotes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  function selectCurrency(setStateCb) {
    setModalSubmitFn(() => val => {
      setModalVisible(false);
      setStateCb(val);
    });
    setModalVisible(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Currency Convertor</Text>
      <Text style={styles.text1}>From</Text>
      <TouchableOpacity
        style={styles.textInput}
        onPress={() => selectCurrency(setFrom)}>
        <Text>{from || 'Select Currency'}</Text>
      </TouchableOpacity>
      <Text style={styles.text1}>To</Text>
      <TouchableOpacity
        style={styles.textInput}
        onPress={() => selectCurrency(setTo)}>
        <Text>{to || 'Select Currency'}</Text>
      </TouchableOpacity>
      <Text style={{alignSelf: 'flex-end', marginRight: 50, marginTop: 20}}>
        {from}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Amount"
        value={amount}
        autoFocus
        onChangeText={text => setAmount(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 17, letterSpacing: 0.5}}>Result</Text>
        <Text style={{marginRight: 30, fontSize: 17, letterSpacing: 0.5}}>
          {to}
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={result.toFixed(3)}
        placeholderTextColor="black"
        editable={false}
      />

      <Modal visible={modalVisible} submit={modalSubmitFn} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    backgroundColor: '#ffffff',
  },
  heading: {
    color: '#458de1',
    fontSize: 25,
    fontWeight: '700',
    width: 150,
    paddingTop: 50,
    paddingBottom: 40,
    letterSpacing: 0.5,
  },
  text1: {
    color: '#323232',
    fontSize: 25,
    letterSpacing: 0.5,
    paddingVertical: 10,
  },
  textInput: {
    padding: 17,
    backgroundColor: '#d3d2d2',
    width: '90%',
    marginVertical: 10,
    fontSize: 25,
    letterSpacing: 0.5,
    borderRadius: 10,
  },
  button: {
    padding: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00d998',
    borderRadius: 10,
    marginTop: 10,
  },
});
