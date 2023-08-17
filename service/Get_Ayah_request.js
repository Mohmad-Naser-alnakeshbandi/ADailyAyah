import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'react-native-axios'; // Import axios without the 'react-native-' prefix

const GetRandomAyah = () => {
  const [surahName, setSurahName] = useState(null);
  const [ayah, setAyah] = useState(null);
  const [ayahNumber, setAyahNumber] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get(
          'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/index.json'
        );
        const surahs = response.data;
        const randomSurahIndex = Math.floor(Math.random() * surahs.length);
        const randomSurah = surahs[randomSurahIndex];

        console.log(randomSurah.name);
        setSurahName(randomSurah.name);

        const ayahResponse = await axios.get(randomSurah.link);
        const ayahs = ayahResponse.data.verses;
        const randomAyahIndex = Math.floor(Math.random() * ayahs.length);
        const randomAyah = ayahs[randomAyahIndex];

        console.log(randomAyah.id);
        setAyahNumber(randomAyah.id);
        setAyah(randomAyah.text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.ayahText}>{ayah}</Text>
      <Text style={styles.surahAyahText}>
        {surahName} {ayahNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  ayahText: {
    fontSize: 18,
    marginBottom: 25,
  },
  surahAyahText: {
    fontSize: 18,
  },
});

export default GetRandomAyah;
