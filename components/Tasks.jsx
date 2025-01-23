import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';

const Tasks = props => {
  const [tasks, setTasks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [task, setTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [id, setId] = useState('');
  const uri = 'http://localhost:3000/tasks';


 

  const getTasks = async () => {
    try {
      let response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`HTTP ERROR STATUS : ${response.status}`);
      }
      let result = await response.json();
      setTasks(result);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async id => {
    try {
      let response = await fetch(`${uri}/${id}`, {
        method: 'delete',
      });
      if (!response.ok) {
        console.log('HTTP ERROR STATUS ', response.status);
      }

      let result = await response.json();
      if (result) {
        getTasks();
        console.log('Delted !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = async id => {
    try {
      let response = await fetch(`${uri}/${id}`);

      if (!response.ok) {
        console.log('HTTP RESPONSE STATUS ', response.status);
      }

      let result = await response.json();

      if (result) {
        setId(id);
        setTask(result.title);
        setTaskDescription(result.description);
      }
    } catch (error) {
      console.log(error);
    }
    setShowUpdateModal(true);
  };

  const updateTask = async () => {
    const newObj = {title: task, description: taskDescription};
    try {
      let response = await fetch(`${uri}/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObj),
      });

      if (!response.ok) {
        console.log('HTTP ERROR STATUS', response.status);
      }

      let result = await response.json();

      if (result) {
        getTasks();
        setShowUpdateModal(false);
        console.log('Updated !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const close = () => {
    setShowUpdateModal(false);
  };

  return (
    <View style={styles.TasksMain}>
      <ScrollView>
        {tasks.length > 0 ? (
          tasks.map((item, index) => (
            <View style={{flex: 1, borderWidth: 7, padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                  {++index}.
                </Text>
                <Text
                  style={{fontSize: 22, fontWeight: 'bold', marginLeft: 10}}>
                  {item.title}
                </Text>
              </View>
              <View style={{marginLeft: 29}}>
                <Text style={{fontSize: 20}}>{item.description}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'flex-end',
                  }}>
                  <View>
                    <Button
                      title="Delete"
                      onPress={() => deleteTask(item.id)}
                    />
                  </View>

                  <View style={{marginLeft: 6}}>
                    <Button title="Update" onPress={() => openModal(item.id)} />
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No Record Found !</Text>
        )}
      </ScrollView>

      <Modal transparent={true} visible={showUpdateModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{padding: 10, backgroundColor: 'white', width: '90%'}}>
            <TextInput value={task} onChangeText={text => setTask(text)} />
            <TextInput
              value={taskDescription}
              onChangeText={text => setTaskDescription(text)}
            />

            <View style={{margin: 10}}>
              <Button title="Update" onPress={updateTask} />
            </View>
            <View style={{margin: 10}}>
              <Button title="Close" onPress={close} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  TasksMain: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default Tasks;
