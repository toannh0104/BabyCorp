import React, { Component } from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-native-youtube';
import {View, Text, FlatList, ActivityIndicator, TouchableHighlight} from "react-native";
import {List, ListItem, SearchBar, Avatar} from "react-native-elements";
import { NavigationActions } from 'react-navigation';


class ListVideo extends React.Component{

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
    const url = `https://demo9821357.mockable.io`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          //data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: res.results,
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

  filterVideo = () => {
    var x = 1;
    var y = 2;
    var x = 43;
    if(x == y){
      z = 3;
      console.log(z);
    }
    var keyword = this.refs.keyword;

    console.log("filter");
    //this.state.data.filter(d => d.indexOf(keyword) !== -1 );
  }
  renderHeader = () => {
    return <SearchBar placeholder="Search..." ref={search => this.search = search} lightTheme onChangeText={this.filterVideo()} />;
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

  openVideo = (videoIds) => {
    console.log("do play id : "+videoIds);
    this.props.detailScreen(videoIds);
  }
    render(){
      
      //var videoIds=["n9CJjlDkbQg", "g2Uftu_8z3M"];
      var vid = "iTqRNR2MQ1Y";
        return(
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, i }) => (
                  <ListItem
                    component={TouchableHighlight}
                    roundAvatar = {false}
                    titleNumberOfLines = {3}
                    title={`${item.title}`}
                    subtitle={`${item.title}`}
                    avatar={<Avatar
                          large
                          rounded={false}                    
                          source={{uri: item.avatar}}
                          onPress={() => this.openVideo(item.youtubeId)}
                          activeOpacity={0.1}
                          />}
                    onPress={() => this.openVideo(item.youtubeId)}
                    containerStyle={{ borderBottomWidth: 0 }}              
                  />
                )}
                
                keyExtractor={item => item.title}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={<SearchBar placeholder="Search..." ref={search => this.search = search} lightTheme onChangeText={this.filterVideo()} />}
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
  detailScreen: (vid) =>
  {
    console.log("vid"+vid)
    dispatch(NavigationActions.navigate({ routeName: 'Detail', params: { vid: vid} }))
  }
    
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListVideo);