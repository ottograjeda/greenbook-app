import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useStateValue} from "../components/State";
import { getStyles, Theme } from '../utils';
import { Link } from "./Link"; 
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ListItem({ listing, last }) {

    const [{ isWeb, theme }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header4, text_body, text_body3', {isWeb, theme}));

    const navigation = !isWeb ? useNavigation() : null
    
    let content = (
        <View style={{borderBottomWidth: last ? 0 : 2, borderColor: Theme.green, padding: 20, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Image style={{width: '100%', aspectRatio: 1}} cdn source={{uri: listing.primary_image.url + '&w=400' }} />
            </View>
            <View style={{flex: 2, paddingLeft: 20}}>
                <Text style={[styles.text_header4]}>{listing.name}</Text>
                <Text style={[styles.text_body2,{fontSize: 16, paddingTop: 10, paddingBottom:20}]}>{listing.description}</Text>
                <View style={{width: 46, borderColor: Theme.green, borderBottomWidth: 2}} />
                {!!listing.cuisines && !!listing.cuisines.length && <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                    <View style={{marginRight: 10}}>
                        <FontAwesome name="tags" size={24} color={Theme.green} />
                    </View>
                    <View>
                        <Text style={[styles.text_body3]}>
                            {listing.cuisines.map(cuisine => cuisine.cuisine).filter(cuisine => cuisine).join(', ')}
                        </Text>
                    </View>
                </View>}
                {!!listing.phone_number && <Text style={[styles.text_body3,{fontSize: 16, paddingTop: 20}]}>{listing.phone_number}</Text>}
                {!!listing.address && <Text style={[styles.text_body3,{fontSize: 16, paddingTop: 10, paddingBottom:20}]}>{listing.address}</Text>}
            </View>
        </View>
    )

    return (
        <Link href='/biz/[name]' as={'/biz/' + listing.uid} onPress={() => {
            dispatch({type: 'setView', view: '/biz/' + listing.uid});
            navigation.navigate('Directory', {screen: 'Listing'}) }}>
            {content}
        </Link>
    ) 
};
