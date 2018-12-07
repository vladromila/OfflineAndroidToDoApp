import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList,AsyncStorage } from 'react-native';
import { Input, CardSection } from './common/index';
import { Button, ListItem } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/FontAwesome';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      data:[]
    }
  }
  componentWillMount(){
    this._storeData();
    this._retrieveData();
  }
  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if (value !== null) {
        this.setState({data:JSON.parse(value)});
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  render() {
    return (

      <View style={styles.container}>
        <StatusBar hidden />
        <CardSection>
          <Input label="Activitate" value={this.state.input} onChangeText={(value) => {
            this.setState({ input: value })
          }} /></CardSection>
        <Button
          title="Adauga"
          onPress={()=>{
            if(this.state.input!=='')
            {
            let items=this.state.data;
            items.push({nume:this.state.input})
            this.setState({data:items,input:''})
            this._storeData(items)}
          }}
        />
        <FlatList
        data={this.state.data}
        keyExtractor={(item,index)=>`${index}`}
        extraData={this.state}
        renderItem={({item,index})=>{
          return <ListItem
          rightIcon={<Icon1 name="times" size={40} style={{ paddingRight: 10, color: 'black' }}
          onPress={()=>{
let items=this.state.data;
items.splice(index,1);
this.setState({data:items})
this._storeData(items)
          }}
          />}
          title={`${item.nume}`}
          />
        }}
        
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20
  },
});
