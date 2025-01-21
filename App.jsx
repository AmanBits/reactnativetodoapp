import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, FlatList, TouchableHighlight,StyleSheet, Modal} from 'react-native';

const App = () => {
  const [tasks, setTask] = useState([]);
  const [title,setTitle] =useState("");
  const [description,setDescription]=useState("");
  const [showModal,setModalVisibility]=useState(false);
  const [showApp,setAppVisiblity]=useState(false);


  const writeTitle =(title)=>{
    setTitle(title);
  }

  const writeDesc = (desc)=>{
    setDescription(desc);
  }


  function addTask(){
   setTask([...tasks,{id:tasks.length+1,title:title,description:description}]);
   setTitle("");
   setDescription("");
   setModalVisibility(false);
  }

const showConfirm = ()=>{
  setModalVisibility(true);
}
 
  
  return (
    <View>
 
      <Button title={showApp ? "Close" : "Start"} onPress={()=> setAppVisiblity(!showApp)} />
      { showApp ? <View>
      <Text
        style={{
          fontSize: 40,
          color: '#b4b8ab',
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: '#0d1b2a',
        }}>
        Tasks
      </Text>

      <TextInput
        placeholder="Enter Title"
        style={{
          fontSize: 30,
          borderWidth: 3,
          borderColor: '#8d99ae',
          margin: 10,
        }}
        value={title}
        onChangeText={(title)=>writeTitle(title)}
      />

      <TextInput
        placeholder="Enter Task"
        style={{
          fontSize: 30,
          borderWidth: 3,
          borderColor: '#8d99ae',
          margin: 10,
        }}
        value={description}
        onChangeText={(desc)=>writeDesc(desc)}
      />

      {/* <Button title="Add" onPress={addTask} /> */}

      

      <TouchableHighlight onPress={showConfirm}>
        <View>
          <Text style={{textAlign:"center",fontSize:24,fontFamily:"bold",backgroundColor:"green"}}>ADD</Text>
        </View>
      </TouchableHighlight>


      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContentWrapper}>
          <View style={styles.modalContent}>
          <Text style={{fontSize:24}}>{title}</Text>
          <Text style={{fontSize:20,marginBottom:20}}>{description}</Text>
          <Button title="Confirm" onPress={addTask}></Button>
          </View>
        </View>
      </Modal>

      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
          }}>
          All Tasks !
        </Text>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <View style={{margin: 15}}>
              <Text style={{fontSize: 25, fontWeight: '600'}}>
                {item.id}.{item.title}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                {item.description}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) =>
             index.toString()
          }
        />


      </View>

      </View> : null}
    </View>
  );
};


const styles = StyleSheet.create({
 modalContentWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
 },
 modalContent:{
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // 
    borderWidth:3
 }
})

export default App;
