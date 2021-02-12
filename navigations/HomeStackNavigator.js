import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home'
import CustomHeader from './CustomHeader';
import { Container, Content, Header, List, ListItem, Text, Icon } from 'native-base';
import { getStyles, Theme } from '../utils';
import { useStateValue } from "../components/State";
import { Link } from "../components/Link";
import { useRoute, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export const CustomHeaderWrapper = ({ children }) => {

  const route = useRoute();
  const navigation = useNavigation();
  const [{ isWeb }] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_header3, text_body', {isWeb}));

  const handleNavigate = () => navigation.goBack();
 
  return (
    <Container>
      <Header style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}]}>
        <TouchableOpacity onPress={handleNavigate} style={{ width: 20, marginRight: 'auto', marginLeft: 10 }}>
          <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 24, color: Theme.green  }}/>
        </TouchableOpacity>
        <Text style={[styles.text_header3, { marginRight: 'auto', marginLeft: -30 }]}>{route.params.stateName || route.params.city}</Text>
      </Header>
      <Content>
        {children}
      </Content>
  </Container>
  )
}

const StateListingComponent = ({navigation}) => {
  
  const { params : { cities, abbr, stateName }} = useRoute();
  const [{ isWeb }, dispatch] = useStateValue();
  const styles = StyleSheet.create(getStyles('text_body', {isWeb}));

  return (
    <CustomHeaderWrapper>
      <List>
        {cities.map(city => {
          const cityCapatalized = city.split(' ').map((t) => t[0].toUpperCase() + t.substring(1)).join(' ');

          return (
            <ListItem key={city} >
              <Link
                href={`/search?q=&near=${cityCapatalized}, ${abbr}`} 
                onPress={() => {
                  dispatch({ type: 'loading', value: true });
                  dispatch({type: 'searchConfig', value: { q: "", near: `${cityCapatalized}, ${abbr}`}});
                  navigation.navigate('Directory', { screen: 'Home' })
                }}>
                <Text style={[styles.text_body,{ color: Theme.green, fontSize: 18, paddingTop: 5, paddingBottom: 5, textTransform: 'capitalize'}]}>{city}</Text>
              </Link> 
            </ListItem>
            ) 
          })
        }
      </List>
    </CustomHeaderWrapper>
  )
}

const HomeWithScrollToPreventRerender = (props) => (
  <ScrollView>
    <Home {...props}/>
  </ScrollView>
)

const HomeStack = (props) => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen name="Home" component={HomeWithScrollToPreventRerender} options={{
      header: () => <CustomHeader dark {...props} />
    }} />

    <Stack.Screen name="StateListing" component={StateListingComponent} options={{headerShown: false}} />
  </Stack.Navigator>
)

export default HomeStack;