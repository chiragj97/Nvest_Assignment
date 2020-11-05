import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_KEY, TMDB_IMAGE_BASE_URL } from './config';

class GenreBasedMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genreType: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=${this.props.navigation.state.params.id}`
      )
      .then((response) =>
        this.setState({
          genreType: response.data.results,
        })
      );
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>
          {this.props.navigation.state.params.name} Movies
        </Text>
        <FlatList
          keyExtractor={(a) => `${a.id}`}
          horizontal
          data={this.state.genreType}
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

export default GenreBasedMovies;
