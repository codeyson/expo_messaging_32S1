import React from 'react';
import {StyleSheet,View,Text,TextInput,Alert,TouchableHighlight, Image,BackHandler} from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import {createImageMessage,createLocationMessage,createTextMessage} from './components/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
  };

  componentWillMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { fullscreenImageId } = this.state;

        if (fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }

        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }
  
  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Confirm deletion',
          'Are you sure you want to delete this message?',
          [
            { text: 'No', style: 'cancel' },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: () => {
                this.setState((state) => ({
                  messages: state.messages.filter(
                    (message) => message.id !== id
                  ),
                }));
              },
            },
          ]
        );
        break;

      case 'image':
        this.setState({ fullscreenImageId: id });
        break;

      default:
        break;
    }
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(
      (message) => message.id === fullscreenImageId
    );

    if (!image) return null;
    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image
          style={styles.fullscreenImage}
          source={{ uri: image.uri }}
        />
      </TouchableHighlight>
    );
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        <View style={styles.inputMethodEditor}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
          />
        </View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarText}>Toolbar</Text>
        </View>        
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebef',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputMethodEditor: {
    height: 60,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  toolbar: {
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarText: {
    fontSize: 14,
    color: '#555',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  fullscreenImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
});