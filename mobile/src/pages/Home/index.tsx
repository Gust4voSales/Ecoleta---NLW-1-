import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const { navigate } = useNavigation();
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    function handleNavigateToPoints() {
        navigate("Points", { uf, city });
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS==='ios' ? 'padding' : undefined}>
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 274, height: 368, }}    
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>
                    Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                </Text>
            </View>

            <View style={styles.footer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Digite a UF"
                    value={uf}
                    maxLength={2}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChangeText={text => setUf(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Digite a cidade"
                    value={city}
                    autoCorrect={false}
                    onChangeText={text => setCity(text)}
                />

                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Feather name="arrow-right" color="#fff" size={24}/>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>

        </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Home;