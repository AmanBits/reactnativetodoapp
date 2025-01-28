import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {searchTaskRequest} from '../redux/actions/tasksActions';

export default function Search() {
  const [search, setSearch] = useState('');
  const tasks = useSelector(state => state.tasks);
  

  const dispatch = useDispatch();

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
