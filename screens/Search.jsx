import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function Search() {
  const [search, setSearch] = useState('');
  const [taskList, setTaskList] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks?title=${search}`,
      );

      if (!response.ok) {
        console.log(response.status);
        return;
      }

      let result = await response.json();

      if (result) {
        setTaskList(result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getItems();
  }, [search]);

  return (
    <View>
      <View>
        <TextInput
          placeholder="search"
          onChangeText={text => setSearch(text)}
          style={styles.searchBox}
        />
      </View>
      <View>
        {taskList.length > 0
          ? taskList.map(item => {
              return (
                <View style={styles.searchItem}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              );
            })
          : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    fontSize: 22,
  },
  searchItem: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
  },
});
