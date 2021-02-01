import 'react-native-gesture-handler';
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import ScreenOne from './screens/screen1'
import ScreenTwo from './screens/screen2'
import ScreenThree from './screens/screen3'

const Stack = createStackNavigator();

function Index() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="ScreenOne" component={ScreenOne} />
				<Stack.Screen name="ScreenTwo" component={ScreenTwo} />
				<Stack.Screen name="ScreenThree" component={ScreenThree} />
			</Stack.Navigator>
		</NavigationContainer>
	
	);
		
}

export default Index;