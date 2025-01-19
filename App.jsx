import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';

const App = () => {
  const [tasks, setTask] = useState([]);

  const [title,setTitle] =useState("");
  const [description,setDescription]=useState("");


  const writeTitle =(title)=>{
    setTitle(title);
  }

  const writeDesc = (desc)=>{
    setDescription(desc);
  }


  function addTask(){
   let task={id:tasks.length+1,title:title,description:description};
   setTask([...tasks,task]);
   setTitle("");
   setDescription("");
  }


  return (
    <View>
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

      <Button title="Add" onPress={addTask} />

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
    </View>
  );
};

export default App;
