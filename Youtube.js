import React, { Component } from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-native-youtube';
import   {Text, View} from 'react-native';

class Youtube extends React.Component{

    render(){
        var playlistId = "PL5Ki3HnGmjJy14NR-03BUXgwsofK-sCsz";        
        return(
            <View>
                <Text>

                    {this.props.mang}

                </Text>
                <YouTube
                playlistId = {playlistId}
                play={true}
                hidden={false}
                fullscreen={true}
                apiKey="AIzaSyD_Z9SCsFVjAqWd7RBNamrf5-hda48Xot0"
                onReady={(e)=>{this.setState({isReady: true})}}
                onChangeState={(e)=>{this.setState({status: e.state})}}
                onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                onError={(e)=>{this.setState({error: e.error})}}
                
                style={{alignSelf: 'stretch', height: 250, backgroundColor: 'black', marginVertical: 10}}
                />
            </View>
        )
    }
}

module.exports = connect(function(state){
    return {mang: state.mang}
})(Youtube);