import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

export default function Details(props) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(props.route.params.taskData.title);
  const [description, setDescription] = useState(
    props.route.params.taskData.description,
  );

  const handleUpdate = async id => {
    const newItem = {title: title, description: description, status: false};

    try {
      const response = await fetch(`http://192.168.94.105:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        console.log(response.status);
        return;
      }

      let result = await response.json();

      if (result) {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useState(() => {}, []);

  return (
    <View style={{opacity: showModal ? 0.5 : 1}}>
      <View style={styles.detailBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.updateBtnBox}>
          <Button title="Update" onPress={() => setShowModal(true)} />
        </View>
        <Modal transparent={true} visible={showModal}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalBox}>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={text => setTitle(text)}
                placeholder="Title"
              />
              <TextInput
                style={styles.textInput}
                value={description}
                onChangeText={text => setDescription(text)}
                placeholder="Describe..."
              />
              <View style={styles.modalUpdateBtnsWrapper}>
                <View style={styles.modalUpdateBtnBox}>
                  <Button
                    title="Update"
                    onPress={() => handleUpdate(props.route.params.taskData.id)}
                  />
                </View>
                <View style={styles.modalCloseBtnBox}>
                  <Button title="close" onPress={handleClose} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalUpdateBtnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  modalUpdateBtnBox: {},
  modalCloseBtnBox: {},

  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    borderWidth: 1,
    width: '90%',
    padding: 20,
    borderRadius: 8,
  },
  textInput: {
    fontSize: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    borderBottomWidth: 1,
    padding: 10,
  },
  description: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'left',
    margin: 20,
  },
});
