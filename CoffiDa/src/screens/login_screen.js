import * as React from 'react'
import { Text, View, Button } from 'react-native'
import PropTypes from 'prop-types'

// class LoginScreen extends Component {
//   render () {
    
//     return (
//       <View>
//         <Text>Login Screen</Text>
//         <Button onPress={() => nav.navigate('HomeScreen')} title='SUBMIT' />
//       </View>
//     )
//   }
// }

function Login(props) {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button onPress={() => props.navigation.navigate('HomeScreen')} title='SUBMIT' />
    </View>
  )
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default Login
