import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GenreBasedMovies from './src/screens/GenreBasedMovies';
import AllMovies from './src/screens/AllMovies';
import PopularMovies from './src/screens/PopularMovies';
import TopRatedMovies from './src/screens/TopRatedMovies';

const navigator = createStackNavigator(
  {
    GenreBased: GenreBasedMovies,
    Home: AllMovies,
    Popular: PopularMovies,
    TopRated: TopRatedMovies,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'The Movies',
    },
  }
);

export default createAppContainer(navigator);
