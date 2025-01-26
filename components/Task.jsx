import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Task = props => {
  return (
    <View style={styles.taskWrapper}>
      <Text style={styles.taskName}>{props.data.title}</Text>
      <Text style={styles.taskDescription}>
        {props.data.description.length < 27
          ? props.data.description
          : props.data.description.substring(0, 29) + '...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    padding: 8,
    padding: 20,
    borderBottomWidth: 1,
  },
  taskName: {
    fontSize: 22,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 20,
    fontWeight: '400',
  },
});

export default Task;
