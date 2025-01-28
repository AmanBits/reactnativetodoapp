import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {searchTaskRequest} from '../redux/actions/tasksActions';

export default function Search() {
  const [search, setSearch] = useState('');
  const tasks = useSelector(state => state.tasks);
  

<<<<<<< HEAD
  const dispatch = useDispatch();
=======
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
>>>>>>> 09409e04cb4637e6e868632b06be12c67e7c4239

  useEffect(() => {
    dispatch(searchTaskRequest(search));
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
        {tasks.length > 0
          ? tasks.map(item => {
              return (
                <View style={styles.searchItem} key={item.id}>
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
