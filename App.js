import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, PermissionsAndroid } from 'react-native';
import { RNFS, readFile } from 'react-native-fs'; // For file system operations
import CSVToJSON from 'csvtojson';
import DocumentPicker from 'react-native-document-picker';
import XLSx from 'xlsx'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Dropdown } from 'react-native-element-dropdown';


const MyComponent = () => {
  const datass = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];



  const [jsonArray, setJsonArray] = React.useState([]);
  const [input1, setinput1] = React.useState('');
  const [input2, setinput2] = React.useState('');
  const [input3, setinput3] = React.useState('');
  const [input4, setinput4] = React.useState();
  const [input5, setinput5] = React.useState('');
  const [data, setData] = React.useState([]);


  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to save images.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        pickCSVFile()
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const pickCSVFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      readFile(result[0].uri, "ascii").then(res => {
        const wb = XLSx.read(res, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname]
        const data = XLSx.utils.sheet_to_json(ws, { header: 1 });
        console.log(data[0], '=====dall data');
        setData(data)
        var tempo = [];
      })

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        console.error('Error picking CSV file:', err);
      }
    }
  };


  const valide = () => {
    const filtered = data.filter((subArray) => {
      return (
        subArray[0] === input1.toUpperCase() &&
        subArray[1] === input2.toUpperCase() &&
        subArray[2] === input3.toUpperCase() &&
        subArray[3] === parseFloat(input4)

      );
    });


    console.log(input1, "======")
    console.log(input2, "======")
    console.log(input3, "======")
    console.log(input4, "======")
    console.log(filtered[0][5], "======")
  }
  return (
    <View>
      {/* 
PS	IF   	D	0.18	0.22	1370	10/6/2023
PS	VVS1	D	0.18	0.22	1370	10/6/2023
PS	VVS1	L	0.23	0.29	940	10/6/2023	
PS	VVS2	L	0.23	0.29	940	10/6/2023	
PS	VS1	L	0.23	0.29	810	10/6/2023	
 */}
      <TouchableOpacity onPress={() => requestStoragePermission()} style={{ backgroundColor: 'yellow', height: 40, width: 60, }}>
        <Text >
          click csv
        </Text>
      </TouchableOpacity>


      <TextInput

        onChangeText={text => setinput1(text)}
        value={input1}
        placeholder="txt1"

      />

      <TextInput
        onChangeText={text => setinput2(text)}
        value={input2}
        placeholder="txt2"

      />
      <TextInput
        onChangeText={text => setinput3(text)}
        value={input3}
        placeholder="useless placeholder"

      />
      <TextInput
        onChangeText={text => setinput4(text)}
        value={input4}
        placeholder="useless placeholder"
      />
      <TouchableOpacity onPress={() => valide()} style={{ backgroundColor: 'yellow', height: 40, width: 60, }}>
        <Text >
          cvalide
        </Text>
      </TouchableOpacity>

      {jsonArray.map((item, index) => (
        <View key={index}>
          <Text>{item.a}</Text>
          <Text>{item.b}</Text>
          <Text>{item.c}</Text>
          {/* Add more fields as needed */}
        </View>

      ))}


      <Dropdown
        style={[styles.dropdown, { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={datass}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select item'}
        searchPlaceholder="Search..."
        value={"value"}
      // onFocus={() => setIsFocus(true)}
      // onBlur={() => setIsFocus(false)}
      // onChange={item => {
      //   setValue(item.value);
      //   setIsFocus(false);
      // }}
      // renderLeftIcon={() => (
      //   <AntDesign
      //     style={styles.icon}
      //     color={isFocus ? 'blue' : 'black'}
      //     name="Safety"
      //     size={20}
      //   />
      // )}
      />
    </View>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});