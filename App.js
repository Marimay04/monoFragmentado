import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header } from '@rneui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {PhonicSoundButton} from './components/PhonicSoundButton';

import db from './localdb.js';


export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      text:'',
      chunks:[],
      phonicSound:[],
    };
  }

  render(){
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Header
      backgroundColor={'#E6C9FC'}
      centerComponent={{
        text: 'Monkey Chunky',
        style:{color:'#fff',fontSize:25},
      }}/>

      <Image
      style={styles.imagenIcon}
      source={require('./assets/mono.png')}></Image>

      <TextInput
      style={styles.inputBox}
      onChangeText={text=>{
        this.setState({text:text});
      }}
      value={this.state.text}
      />

      <TouchableOpacity
      style={styles.goButton}
      onPress={()=>{
        var word=this.state.text.toLowerCase().trim()
      //this.setState({displayText:this.state.text})
      console.log(word);
      db[word]?(
      this.setState({chunks:db[word].chunks}),
      this.setState({phonicSound:db[word].phones})
    ):
    Alert.alert("La palabra no existe");
      }}>
      <Text style={styles.buttonText}>IR</Text>

      </TouchableOpacity>
      <View>
        {this.state.chunks.map((item,index)=>{
          return(
            <PhonicSoundButton
            wordChunk={this.state.chunks[index]}
            soundChunk={this.state.phonicSound[index]}
            />
          );
        })}
      </View>

    </View>
    </SafeAreaProvider>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
inputBox:{
  marginTop:20,
  width:'80%',
  alignSelf:'center',
  borderWidth:2,
  borderColor:'#FFB3EA'
},
goButton:{
  width:'50%',
  alignSelf:'center',
  marginTop:20,
},
buttonText:{
  textAlign:'center',
  fontSize:20,
  backgroundColor:'#FFB3EA',
},
displayText:{
  textAlign:'center',
  fontSize:30,
},
imagenIcon:{
width:100,
height:100,
alignSelf:'center'
}
});
