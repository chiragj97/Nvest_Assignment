import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { REACT_APP_API_KEY, TMDB_IMAGE_BASE_URL } from './config';
import PopularMovies from './PopularMovies';
import TopRatedMovies from './TopRatedMovies';
class AllMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGenreMovies: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${REACT_APP_API_KEY}`
      )
      .then((response) =>
        this.setState({
          allGenreMovies: response.data.genres,
        })
      );
  }

  getGenre = (id, name) => {
    console.log(id);
    // console.log(this.props);
    this.props.navigation.navigate('GenreBased', {
      id,
      name,
    });
  };

  render() {
    return (
      <View style={styles.view}>
        <ScrollView>
          <PopularMovies />
          <TopRatedMovies />
          <Text style={styles.text}>Genres</Text>
          <FlatList
            keyExtractor={(a) => `${a.id}`}
            horizontal
            data={this.state.allGenreMovies}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.getGenre(item.id, item.name);
                  }}
                  style={styles.temp}
                >
                  <Text key={item.id}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
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
    padding: 10,
    flex: 1,
  },
  temp: {
    width: 130,
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: '#808085',
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
});

export default AllMovies;
