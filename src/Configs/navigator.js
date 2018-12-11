import { createStackNavigator } from "react-navigation";
import VisibleChat from '../Containers/Chat/visibleChat'
import VisibleStats from '../Containers/Stats/visibleStats';

export default AppNavigator = createStackNavigator({
    Home: {
      screen: VisibleChat, 
      navigationOptions: () => ({
        title: `Chat`,
        headerBackTitle: null,       
      })
    }, 
    Stats: {
      screen: VisibleStats,
      navigationOptions: () => ({
        title: `Stats`,
        headerBackTitle: null
      })
    }
  })