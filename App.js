import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Status from './components/Status';

export default function App() {
  return (
    <View style={styles.container}>
      <Status />

      <View style={styles.content}>
        <Text>Main content</Text>
      </View>


      <View style={styles.inputMethodEditor}>
        <Text>Input Area</Text>
      </View>

      <View style={styles.toolbar}>
        <Text>Toolbar</Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: '  #ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#ffffff',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});