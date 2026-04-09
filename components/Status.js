import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight;

export default class Status extends React.Component {
  state = {
    info: null,
  };

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      const connectionType = state.isConnected ? state.type : 'none';
      this.setState({ info: connectionType });
    });

    this.unsubscribe = NetInfo.addEventListener((state) => {
      const connectionType = state.isConnected ? state.type : 'none';
      this.setState({ info: connectionType });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents="none">
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No Network Connection!</Text>
          </View>
        )}
      </View>
    );

    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight + 70,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});