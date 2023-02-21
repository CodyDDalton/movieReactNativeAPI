import { StyleSheet, FlatList } from 'react-native';
import ListItem from './ListItem';
import styles from '../Appstyles'

export default function ListContainer({movies}) {

    const Movie = ({title}) => (
        <Text>{title}</Text>
     );

    const DATA = movies;



  return (
    <FlatList
        data={DATA}
        renderMovie={({movie}) => <Movie title={movie.title} />}
        keyExtractor={movie => movie._id}
        style={styles.listContainer}

    />
  );
}
