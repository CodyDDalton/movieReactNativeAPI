import React, { useState, useEffect } from 'react'
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from './Appstyles'    


export default function Movie({navigation, route }) {
  const [data, setData] =useState([]);
    const { film } = route.params;
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [released, setReleased] = useState('');
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])
    const id = film[0]._id;

    

    const API_BASE = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000/api/v1' 
    : process.env.REACT_APP_BASE_URL
    let ignore = false;
    useEffect(() => {

      if(!ignore){
        getMovie()
      }

      return () => {
        ignore = true;
      }
    }, [])


    const getMovie = async (res, req) =>{
      
      try{
        await fetch(`${API_BASE}/movies/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title)
          setGenre(data.genre)
          setReleased(data.released)
          
        })

      } catch (error) {
        console.log(error.message || "Unexpected error")

      } 

    }

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
        console.error(error.message || "Unexpected error")
    }
    finally {
      setLoading(false)
    }
  }

    const deleteMovie = async () => {
        try{
            await fetch(`${API_BASE}/movies/${id}`, {
                method: 'DELETE'
            })
              .then(res => res.json())
              .then(() => {
                  getMovies()
              .then(() => {
                navigation.navigate("Home")
                
              })
              
            })
        } catch (error) {
            console.log(error.message || "Unexpected Error")
        }
    }

    const updateMovie = async () => {
        try{
            await fetch(`${API_BASE}/movies/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title:`${title}`,
                    genre:`${genre}`,
                    released: `${released}`
                  })
                 
            })
            .then(res => res.json())
            .then(data => {
              navigation.navigate("Archive")
              console.log({data})
          })
                

        } catch (error) {
            console.log(error.message || "Unexpected Error")
        }
    }

    const handleSubmit = () => {
        updateMovie();
        console.log(title, genre, released)
    }


    return(
    <SafeAreaView style={styles.container}>
    <View style={styles.nav}>
      <View style={styles.navBut}><Button color='red' title='Go to home' onPress={() => navigation.navigate('Home')} /></View>
      <View style={styles.navBut}><Button color='red' title='Go to archive' onPress={() => navigation.navigate('Archive')} /></View>
    </View>
       <Text style={styles.movie}>
        {title}<br></br>
        Genre: {genre}<br></br>
        Released: {released}
        </Text>
        
        <View style={styles.delete}><Button color='red' title='Delete Movie' onPress={() => deleteMovie()} /></View>
        <Text style={styles.edit}>Edit Movie</Text>
        <View style={styles.editMovie}>
        <TextInput
            placeholder='title'
            name='title'
            onChangeText={setTitle}
            style={styles.updateInput}
            
        />
        <TextInput
            placeholder='genre'
            name='genre'
            onChangeText={setGenre}
            style={styles.updateInput}

            
        />
        <TextInput
            placeholder='year'
            name='released'
            onChangeText={setReleased}
            style={styles.updateInput}

           
        />

        </View>
        
        <View style={styles.updateMovie}><Button color='red' title='Submit' onPress={() => handleSubmit()} /></View>
    </SafeAreaView>
    );
}