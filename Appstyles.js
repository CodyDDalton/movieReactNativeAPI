import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 2,
      alignItems: 'flex-start',
      // justifyContent:'center',
      backgroundColor: '#610000',
      
    },
    archive:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      paddingTop:'15%'

    },
    largeHeading: {
        fontSize: 30,
        fontStyle: 'bold',
        paddingTop:'15%',
        paddingLeft:'40%',
        paddingRight:'40%',
        textAlign:'center',
        ...Platform.select({
          ios: {
            color: 'yellow',
          },
          default: {
            color: 'white'
          }
        }),
    },
    listContainer: {
        flexGrow: 0,
        flexShrink: 0,
    },
    inputs:{
      backgroundColor:'rgba(255,255,255,0.25)',
      color:'white',
      fontSize:12,
      marginLeft:'5%',
      marginRight:'5%',
      borderRadius:'20px',
      padding:'.5%',
      marginTop:'1%',
      textAlign:'center'
    },
    subtitle:{
      color:'white',
      fontSize:16,
      textAlign:'center',
      paddingLeft:'33%',
      paddingRight:'33%'
    },
    displayOS:{
      paddingLeft:'45%',
      paddingRight:'45%',
      ...Platform.select({
        ios:{
          color:'white',
        },
          default:{
            color:'yellow'
          }
        }),
      },
      button:{
        paddingTop:'2%',
        paddingLeft:'42%',
      },
      submit:{
        paddingTop:'2%',
        paddingLeft:'2%',
      },
      addMovie:{
        marginRight:'65%',
        marginLeft:'175%'
      },
      displayMovies:{
        marginRight:'auto'
      },
      titles:{
        fontSize:24,
        color:'white',
        textAlign:'center'
      },
      item:{
        fontSize:18,
        color:'yellow',
        marginLeft:'15%',
        marginTop:'1%',
        marginBottom:'1%',
        
      },
      nav:{
        marginLeft:'40%',
        flexDirection:'row',
      },
      navBut:{
        marginRight:'25%',
        marginTop:'15%'
      },
      delete:{
        paddingTop:'2%',
        paddingLeft:'44%',
      },
      edit:{
        fontSize:24,
        color:'white',
        marginTop:'2%',
        marginLeft:'45%'
      },
      movie:{
        fontSize: 30,
        fontStyle: 'bold',
        paddingTop:'2%',
        paddingLeft:'40%',
        paddingRight:'40%',
        textAlign:'center',
        ...Platform.select({
          ios: {
            color: 'yellow',
          },
          default: {
            color: 'white'
          }
        }),
      },
      editMovie:{
        paddingLeft:'44%',
        marginBottom:'2%'
      },
      updateMovie:{
        paddingLeft:'45%',
      },
      updateInput:{
        backgroundColor:'rgba(255,255,255,0.25)',
      color:'white',
      fontSize:12,
      marginLeft:'1%',
      marginRight:'5%',
      borderRadius:'20px',
      padding:'.5%',
      marginTop:'5%',
      textAlign:'center'
      }

    },
    
);

  export default styles;