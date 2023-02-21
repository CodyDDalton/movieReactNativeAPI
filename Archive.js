import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, Button, FlatList, TextInput, Pressable, View } from 'react-native';
import styles from './Appstyles'    


export default function Archive({navigation}) {  

    const [data, setData] =useState([]);

    const [current, setCurrent] =useState([]);
    const [title, onChangeTitle] =useState('')
    const [genre, onChangeGenre] =useState('')
    const [released, onChangeReleased] =useState('')
    const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  


  const API_BASE = process.env.NODE_ENV === 'development' 
    ? 'https://codycrudapi.herokuapp.com/api/v1' 
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {

      if(!ignore){
        getMovies()
      }

      return () => {
        ignore = true;
      }
    }, [])

    const getMovies = async (res, req) =>{
      setLoading(true)
      try{
        await fetch(`${API_BASE}/movies`)
        .then(res => res.json())
        .then(data => {
          console.log({data})
          setData(data)
          setMovies(data)
        })

      } catch (error) {
        setError(error.message || "Unexpected error")

      } finally {
        setLoading(false)
      }

    }

    const createMovie = async () => {
      try{
      await fetch(`${API_BASE}/movies`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title:`${title}`,
                genre:`${genre}`,
                released: `${released}`
              })
          })
              .then(() => getMovies())

      } catch (error) {
          setError(error.message || "Unexpected Error")
      } finally {
          setLoading(false)
      }
  }

    const handleSubmit = () => {
    //   event.preventDefault();
      createMovie();
  }

    

    useEffect(() => {
        getMovies();
      
      }, []);

       const movieSelect = async (id) => {
        const movieId = id;
        const movies = data;
        const current = movies.filter(movie => movie._id === movieId)
        console.log(current)
        navigation.navigate('Movie', {
            film: current
        }
        )};

        // const postMovie = async () => {
        //     fetch(`https://codycrudapi.herokuapp.com/api/v1/movies`, {
        //         method: 'POST',
        //         'Content-Type': 'application/json',
        //         body: JSON.stringify({
        //           title: title,
        //           genre: genre,
        //           year: year
        //         }),
        //       });
        // }
    
    return(
    <SafeAreaView style={styles.container}>
    <View style={styles.archive}>
    <View style={styles.addMovie}>
    <Text style={styles.titles}>Add a Movie to the Archives</Text>
        <TextInput style={styles.inputs}
            placeholder='title'
            name='title'
            onChangeText={onChangeTitle}
            
        />
        <TextInput style={styles.inputs}
            placeholder='genre'
            name='genre'
            onChangeText={onChangeGenre}
            
        />
        <TextInput style={styles.inputs}
            placeholder='year'
            name='released'
            onChangeText={onChangeReleased}
           
        />
        <View style={styles.submit}>
        <Button color='red' title='Submit' onPress={() => handleSubmit()} />
        </View>
    </View>
      <View style={styles.displayMovies}>
        <Text style={styles.titles}>Archive</Text>
        <FlatList
        value={(item) => item.title}
        id={(item) => item._id}
        keyExtractor={(item) => item._id}
        style={styles.listContainer}
        data={data}
        renderItem={({item}) => (
          <>
            <Pressable value={item} id={item._id} onPress={() => movieSelect(item._id)}><Text style={styles.item}>{item.title}</Text></Pressable>
          </>
        )}
      />
        <Button color='red' title='Go to the Home Page' onPress={() => navigation.navigate('Home')} />

      </View>

    </View>
    
        
    </SafeAreaView>
    );
}