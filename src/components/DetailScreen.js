import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, PixelRatio, Dimensions, Platform,} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';

class DetailScreen extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
  };

  constructor(props){
      super(props);
      
  }

  gotoListVideo(isFullscreen){
      console.log("move to main screen: "+isFullscreen)
      if(!isFullscreen){
        console.log(this.state.fullscreen)
        this.props.listVideo();
      }
      
  }

  render() {
    var {state} = this.props.navigation;
    console.log("xx");
    return (
      <ScrollView
        style={styles.container}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted &&
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyD_Z9SCsFVjAqWd7RBNamrf5-hda48Xot0"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId= {state.params.vid}
            //videoIds = {state.params.vid}
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            //fullscreen={this.state.fullscreen}
            fullscreen={true}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            //onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onChangeFullscreen={e => this.gotoListVideo(e.isFullscreen)}
            
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
          />}

        {/* Playing / Looping */}
        {/* <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}
          >
            <Text style={styles.buttonText}>
              {this.state.status == 'playing' ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState(s => ({ isLooping: !s.isLooping }))}
          >
            <Text style={styles.buttonText}>
              {this.state.isLooping ? 'Looping' : 'Not Looping'}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Previous / Next video */}
        {/* <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.previousVideo()}
          >
            <Text style={styles.buttonText}>Previous Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.nextVideo()}
          >
            <Text style={styles.buttonText}>Next Video</Text>
          </TouchableOpacity>
        </View> */}

        {/* Play specific video in a videoIds array by index */}
        {/* {this._youTubeRef &&
          this._youTubeRef.props.videoIds &&
          Array.isArray(this._youTubeRef.props.videoIds) &&
          <View style={styles.buttonGroup}>
            {this._youTubeRef.props.videoIds.map((videoId, i) =>
              <TouchableOpacity
                key={i}
                style={styles.button}
                onPress={() => this._youTubeRef && this._youTubeRef.playVideoAt(i)}
              >
                <Text style={[styles.buttonText, styles.buttonTextSmall]}>{`Video ${i}`}</Text>
              </TouchableOpacity>,
            )}
          </View>} */}

        {/* Get current played video's position index when playing videoIds (and playlist in iOS) */}
        {/* <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this._youTubeRef &&
              this._youTubeRef
                .videosIndex()
                .then(index => this.setState({ videosIndex: index }))
                .catch(errorMessage => this.setState({ error: errorMessage }))}
          >
            <Text style={styles.buttonText}>
              Get Videos Index: {this.state.videosIndex}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Fullscreen */}
        {/* {!this.state.fullscreen &&
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ fullscreen: true })}
            >
              <Text style={styles.buttonText}>Set Fullscreen</Text>
            </TouchableOpacity>
          </View>} */}

        {/* <Text style={styles.instructions}>
          {this.state.isReady ? 'Player is ready' : 'Player setting up...'}
        </Text>
        <Text style={styles.instructions}>
          Status: {this.state.status}
        </Text>
        <Text> videoId {state.params.vid}
            </Text> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

DetailScreen.navigationOptions = {
    title: 'Detail Video',
};
  

const mapStateToProps = state => ({
    //videoIds: state.params.videoIds,
    //vIndex: state.params.index
});

const mapDispatchToProps = dispatch => ({
    listVideo: () =>
     dispatch(NavigationActions.navigate({ routeName: 'Main' })),
});
  
module.exports = connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
