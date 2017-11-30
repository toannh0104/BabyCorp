import React, { Component } from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-native-youtube';
import { View, Text, FlatList, ActivityIndicator, TouchableHighlight  } from "react-native";
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";

class Youtube extends React.Component{

    constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }
 componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  openVideo = (playlistId) => {
    console.log("do play id : "+playlistId);
    return <Text> Doesn't get printed {playlistId} </Text>
  
  }
    render(){
        var playlistId = "PL5Ki3HnGmjJy14NR-03BUXgwsofK-sCsz";        
        return(
          <View>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, i }) => (
                  <ListItem
                    component={TouchableHighlight}
                    roundAvatar = {false}
                    titleNumberOfLines = {3}
                    title={`${item.name.first} Tiên kiếm kỳ hiệp P3`}
                    subtitle={item.email}
                    avatar={<Avatar
                          large
                          rounded={false}                    
                          source={{uri: item.picture.large}}
                          onPress={() => console.log("Works!")}
                          activeOpacity={0.1}
                          />}
                    onPress={() => this.openVideo(playlistId)}      
                    containerStyle={{ borderBottomWidth: 0 }}              
                  />
                )}
                
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
              />
            </List>
            
            
            </View>
        )
    }
}

module.exports = connect(function(state){
    return {mang: state.mang}
})(Youtube);