import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Hover over a barcode to scan');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  //Request Camera Permission with no requirements (the [] at the end)
  useEffect(() => {
    askForCameraPermission();
  }, []);

  //function called when we scan the barcode
  const handleScannedBarCode = ({type,data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
  }

  // Function that checks permissions and return the screens
  if (hasPermission == null) {
    return (
      <View style={styles.container}>
        <Image style={styles.logo1} source={require('./assets/Barcode-Portal.png')} />
        <Text>Barcode Scanner App</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if( hasPermission == false) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermission}>No Access To Camera</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  //Return the main view
  return (
    <View style={styles.container}>
        <Image style={styles.logo2} source={require('./assets/Barcode-Portal.png')} />
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScannedBarCode}
          style={{height: 400, width: 400}} />
      </View>
      <Text style={styles.textView}>{text}</Text>

      {scanned && <Button title={'Click to Scan Again'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0098FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    borderTopWidth: 30,
    borderBottomWidth: 30,
    borderTopColor: '#00FF85',
    borderBottomColor: '#00FF85',
    backgroundColor: '#00FF85'
  },
  textView: {
    fontSize: 18,
    margin: 20,
    color: '#00FF85'
  },
  logo1: {
    width: 150,
    height: 150,
  },
  logo2: {
    width: 250,
    height: 250,
    marginTop: 75,
    marginBottom: 25,
  },

  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
    color: '#00FF85'
  }

});