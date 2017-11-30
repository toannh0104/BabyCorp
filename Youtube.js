import React, { Component } from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-native-youtube';
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

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
    render(){
        var playlistId = "PL5Ki3HnGmjJy14NR-03BUXgwsofK-sCsz";        
        return(
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
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
            // <View>
            //     <Text>

            //         {this.props.mang}

            //     </Text>
            //     <YouTube
            //     playlistId = {playlistId}
            //     play={true}
            //     hidden={false}
            //     fullscreen={true}
            //     apiKey="AIzaSyD_Z9SCsFVjAqWd7RBNamrf5-hda48Xot0"
            //     onReady={(e)=>{this.setState({isReady: true})}}
            //     onChangeState={(e)=>{this.setState({status: e.state})}}
            //     onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
            //     onError={(e)=>{this.setState({error: e.error})}}
                
            //     style={{alignSelf: 'stretch', height: 250, backgroundColor: 'black', marginVertical: 10}}
            //     />
            // </View>
        )
    }
}

module.exports = connect(function(state){
    return {mang: state.mang}
})(Youtube);