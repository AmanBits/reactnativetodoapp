import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Button,
} from 'react-native';

const Home = props => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskNameError, setTaskNameError] = useState(false);
  const [taskDescriptionError, setTaskDescriptionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const uri = 'http://localhost:3000/tasks';
  const showModalBox = () => {
    if (!taskName) {
      setErrorMessage('Please enter task name');
      setTaskNameError(true);
      return;
    }

    if (!taskDescription) {
      setErrorMessage('Please enter description');
      setTaskDescriptionError(true);
      return;
    }

    setShowModal(true);
  };

  const createTask = text => {
    setErrorMessage('');
    setTaskNameError(false);
    setTaskName(text);
  };

  const createDescription = text => {
    setErrorMessage('');
    setTaskDescriptionError(false);
    setTaskDescription(text);
  };

  const saveTask = async () => {
    let obj = {title: taskName, description: taskDescription, status: false};

    try {
      let response = await fetch(uri, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        console.log('HTTP ERROR STATUS', response.status);
      }

      let result = await response.json();

      if (result) {
        console.log('Task Saved !');
      }
    } catch (error) {
      console.log(error);
    }

    setTaskName('');
    setTaskDescription('');
    setShowModal(false);
  };

  const cancle = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.homeMain}>
      <View style={styles.elementWraper}>
        <TextInput
          style={styles.inputText}
          placeholder="Task name "
          value={taskName}
          onChangeText={text => createTask(text)}
        />

        {taskNameError ? (
          <Text style={{color: 'red'}}>{errorMessage}</Text>
        ) : null}

        <TextInput
          style={[styles.inputText, styles.describeInput]}
          placeholder="Describe your task..."
          value={taskDescription}
          onChangeText={text => createDescription(text)}
        />
        {taskDescriptionError ? (
          <Text style={{color: 'red'}}>{errorMessage}</Text>
        ) : null}
        <TouchableHighlight onPress={showModalBox}>
          <Text style={styles.createButton}>Create Task</Text>
        </TouchableHighlight>

        <Modal transparent={true} visible={showModal} animationType="slide">
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{backgroundColor: 'white', padding: 60, borderRadius: 7}}>
              <Text style={{padding: 20, fontSize: 32}}>Are you sure ?</Text>
              <View style={{padding: 10}}>
                <Button title="Confirm" onPress={saveTask} />
              </View>
              <View style={{padding: 10}}>
                <Button title="Cancel" onPress={cancle} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeMain: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementWraper: {
    width: '90%',
  },
  inputText: {
    color: 'white',
    fontSize: 22,
  },
  describeInput: {},
  createButton: {
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    marginTop: 25,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default Home;
