import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Image, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import api from '../../services/api';


interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Point {
    id: number;
    name: string;
    image: string;
    latitude: number;
    longitude: number;
}

// items: {
//     title: string;
// }[];
const Points = () => {
    const { goBack, navigate } = useNavigation();

    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data);
        });

    }, []);

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Ooops...", "Precisamos de sua permissão para obter a localização.");
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;

            setInitialPosition([latitude, longitude]);
        }

        loadPosition();
    }, []);

    useEffect(() => {
        api.get('points', {
            params: {
                city: "Belo Jardim",
                uf: "PE",
                items: [1, 2],
            }
        }).then(res => {
            setPoints(res.data);
        });
    }, []);

    function handleNavigateBack() {
        goBack();
    }

    function handleNavigateToDetails(id: number) {
        navigate("Details", { pointId: id });
    }

    function handleSelectItem(itemId: number) {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(item => item!==itemId));
        } else {
            setSelectedItems([ ...selectedItems, itemId ]);
        }
    }

    return(
        <>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
                <Feather name="arrow-left" color="#34cb79" size={20} />
            </TouchableOpacity>

            <Text style={styles.title}>Bem vindo.</Text>
            <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

            <View style={styles.mapContainer}>
                { initialPosition[0] !==0 && (
                    <MapView 
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014
                        }}
                        style={styles.map}
                    >
                        {points.map(point => (
                            <Marker 
                                key={String(point.id)}
                                coordinate={{
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                }}
                                style={styles.mapMarker}
                                onPress={() => handleNavigateToDetails(point.id)}
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Image 
                                        style={styles.mapMarkerImage} 
                                        source={{ uri: point.image }}
                                    />
                                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                </View>
                            </Marker>
                        ))}
                        
                    </MapView>
                )}
                
            </View>
        </View>
        
        <View style={styles.itemsContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 20, }}
            >
                {items.map(item => (
                    <TouchableOpacity 
                        style={[
                            styles.item,
                            selectedItems.includes(item.id)
                            ? styles.selectedItem
                            : {}
                        ]} 
                        key={String(item.id)}
                        activeOpacity={0.7}    
                        onPress={() => handleSelectItem(item.id)}
                    >
                        <SvgUri 
                            width={42} 
                            height={42} 
                            uri={api.defaults.baseURL + item.image_url}
                        />
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </TouchableOpacity>

                ))}
               
            </ScrollView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Number(StatusBar.currentHeight),
    },

    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80, 
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 13,
    },
});

export default Points;