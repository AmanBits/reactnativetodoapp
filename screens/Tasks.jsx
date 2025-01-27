import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Task from '../components/Task';

export default function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [showTaskTitleError, setShowTaskTitleError] = useState(false);
  const [showTaskDescriptionError, setShowTaskDescriptionError] =
    useState(false);

  const [taskTitleErrorMessage, setTaskTitleErrorMessage] = useState('');
  const [taskDescriptionErrorMessage, settaskDescriptionErrorMessage] =
    useState('');

  const [deleteTaskList, setDeleteTaskList] = useState([]);

  const handleDeleteTaskList = id => {
    console.log(id);
    setDeleteTaskList([...deleteTaskList, id]);
  };

  const deleteTasks = async () => {
    try {
      const deletedRequest = deleteTaskList.map(id => {
        fetch(`http://192.168.168.105:3000/tasks/${id}`, {
          method: 'DELETE',
        });
      });

      const responses = await Promise.all(deleteTaskList);

      const errors = responses.filter(response => !response.ok);

      if (errors.length > 0) {
        console.log(errors);
      } else {
        console.log('Deleted task successfull');
      }

      setDeleteTaskList([]);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch('http://192.168.168.105:3000/tasks');
      if (!response.ok) {
        console.log(response.status);
        return;
      }

      let result = await response.json();
      setTasks(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    let newItem = {
      title: taskTitle,
      description: taskDescription,
      status: false,
    };

    console.log('New Task:', newItem);
    try {
      let response = await fetch('http://192.168.168.105:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        console.log(response.status);
      }

      let result = await response.json();

      if (result) {
        setTaskTitle('');
        setTaskDescription('');
        setShowModal(false);
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={{opacity: showModal ? 0.2 : 1}}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                props.navigation.navigate('taskDetails', {taskData: item})
              }
              onLongPress={() => handleDeleteTaskList(item.id)}>
              <Task data={item} />
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={styles.addBtnTxt}>+</Text>
      </TouchableOpacity>

      {deleteTaskList.length > 0 ? (
        <TouchableOpacity style={styles.deleteBtn} onPress={deleteTasks}>
          <Text style={styles.deleteBtnTxt}>-</Text>
        </TouchableOpacity>
      ) : null}

      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>ADD TASK </Text>
            <TextInput
              style={styles.modalTextInput}
              onChangeText={text => setTaskTitle(text)}
              value={taskTitle}
              placeholder="Task Name"
            />
            {showTaskTitleError ? (
              <Text style={{fontSize: 60}}>{taskTitleErrorMessage}</Text>
            ) : null}
            <TextInput
              style={styles.modalTextInput}
              placeholder="Task Description..."
              value={taskDescription}
              onChangeText={text => setTaskDescription(text)}
            />
            {showTaskDescriptionError ? (
              <Text>{taskDescriptionErrorMessage}</Text>
            ) : null}
            <View style={styles.modalBtns}>
              <View style={{marginRight: 20, padding: 20}}>
                <Button title="ADD" onPress={addTask} />
              </View>
              <View style={{marginLeft: 20, padding: 20}}>
                <Button
                  title="close"
                  onPress={() => {
                    setTaskTitle('');
                    setTaskDescription('');
                    setShowModal(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    right: 20,
    top: 500,
    padding: 0,
    margin: 0,
  },
  addBtnTxt: {
    backgroundColor: 'yellow',
    fontWeight: '700',
    fontSize: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 60,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    borderWidth: 2,
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
  },
  modalTextInput: {
    fontSize: 20,
    width: '80%',
  },
  modalBtns: {
    flexDirection: 'row',
  },
  deleteBtn: {
    position: 'absolute',
    left: 20,
    top: 500,
  },
  deleteBtnTxt: {
    backgroundColor: 'red',
    fontWeight: '700',
    fontSize: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 60,
  },
});
