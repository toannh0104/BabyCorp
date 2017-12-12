import React, { Component } from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-native-youtube';
import { TouchableHightlight, Text, View, FlatList, ActivityIndicator } from 'react-native';

import {List, ListItem, Avatar} from "react-native-elements";
import { NavigationActions } from 'react-navigation';
import SearchBar from 'react-native-material-design-searchbar'

class ListVideo extends React.Component{

    constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      dataFilter: [],
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
    const url = `https://demo9821357.mockable.io`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          //data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: res.results,
          dataFilter: res.results,
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

  filterVideo = (input) => {
    var dFilter = this.state.data;
    this.state.dataFilter = dFilter.filter(d => d.title.toUpperCase().indexOf(input.toUpperCase()) !== -1)
    this.setState(this.state);
    console.log(this.state.data);
  }
  renderHeader = () => {
    return <div>Hello</div>
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

  openVideo = (title, videoIds) => {
    console.log("do play id : "+videoIds);
    this.props.detailScreen(title, videoIds);
  }
    render(){
      
      //var videoIds=["n9CJjlDkbQg", "g2Uftu_8z3M"];
      var vid = "iTqRNR2MQ1Y";
        return(
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.dataFilter}
                renderItem={({ item, i }) => (
                  <ListItem
                    component={TouchableHightlight}
                    roundAvatar = {false}
                    titleNumberOfLines = {3}
                    title={`${item.title}`}
                    subtitle={`${item.title}`}
                    avatar={<Avatar
                          large
                          rounded={false}                    
                          source={{uri: item.avatar}}
                          onPress={() => this.openVideo(item.title, item.youtubeId)}
                          activeOpacity={0.1}
                          />}
                    onPress={() => this.openVideo(item.title, item.youtubeId)}
                    containerStyle={{ borderBottomWidth: 0 }}              
                  />
                )}
                
                keyExtractor={item => item.id}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={
                  <SearchBar
                  onSearchChange={(input) => this.filterVideo(input)}
                  height={50}
                  onFocus={() => console.log('On Focus')}
                  onBlur={() => console.log('On Blur')}
                  placeholder={'Search...'}
                  autoCorrect={false}
                  padding={5}
                  returnKeyType={'search'}
                  ref="search_box"
                />

//                <Search placeholder="Search..." ref="search_box" lightTheme onChangeText={this.filterVideo()} />
              
              }
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
              />
            </List>
        )
    }
}

const mapStateToProps = state => ({
  videoId: state.videoId
});

const mapDispatchToProps = dispatch => ({
  detailScreen: (title, vid) =>
  {
    console.log("vid"+vid)
    dispatch(NavigationActions.navigate({ routeName: 'Detail', params: {title: title, vid: vid} }))
  }
    
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListVideo);