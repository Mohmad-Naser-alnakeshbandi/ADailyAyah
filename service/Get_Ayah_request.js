import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'react-native-axios';

const Get_Ayah_request = () => {
    const [surahname, setSurahName] = useState(null);
    const [ayah, setAyah] = useState(null);
    const [ayahnumber, setAyahNumber] = useState(null);
    useEffect(() => {
      // Define the URL of the API you want to request in able to get the link
      const SurahsURL = 'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/index.json';
      // Make the GET request using Axios
      axios.get(SurahsURL)
        .then(Surahresponse => {
            var Surahmin= 0;
            var Surahmax = Surahresponse.data.length;
            const randomSurah = Math.floor(Math.random() * (Surahmax - Surahmin + 1)) + Surahmin;
            console.log(Surahresponse.data[randomSurah].name)
            setSurahName(Surahresponse.data[randomSurah].name)
            axios.get(Surahresponse.data[randomSurah].link).then(Ayahresponse =>{
                var Ayahmin= 0
                var Ayahmax = Ayahresponse.data.verses.length
                const randomAyah = Math.floor(Math.random() * (Ayahmax - Ayahmin + 1)) + Ayahmin;
                console.log(Ayahresponse.data.verses[randomAyah].id)
                setAyahNumber(Ayahresponse.data.verses[randomAyah].id)
                setAyah(Ayahresponse.data.verses[randomAyah].text)
            })
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    }, []); // Empty dependency array means this effect runs only once on component mount


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{ayah}</Text>
      <Text>{surahname} {ayahnumber}</Text>
    </View>
  )
}

export default Get_Ayah_request

