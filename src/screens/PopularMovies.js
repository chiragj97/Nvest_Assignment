import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_KEY, TMDB_IMAGE_BASE_URL } from './config';

class PopularMovies extends Component {
  state = {
    popularMovies: [],
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_API_KEY}`
      )
      .then((response) =>
        this.setState({
          popularMovies: response.data.results,
        })
      );
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Popular Movies</Text>
        <FlatList
          keyExtractor={(a) => `${a.id}`}
          horizontal
          data={this.state.popularMovies}
          renderItem={({ item }) => {
            return (
              <Image
                style={styles.image}
                source={{ uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}` }}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  image: {
    width: 130,
    height: 180,
    borderRadius: 8,
    marginRight: 5,
  },
  view: {
    marginBottom: 20,
  },
});

export default PopularMovies;
