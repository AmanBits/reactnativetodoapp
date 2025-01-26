import {Button, StyleSheet, View} from 'react-native';
import React from 'react';

export default function Welcome(props) {
  return (
    <View style={styles.welcomeWrapper}>
      <Button title="Start" onPress={() => props.navigation.navigate('home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
