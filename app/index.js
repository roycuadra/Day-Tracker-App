import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const totalDays = 31; // Number of days to display

export default function App() {
  const [checkedDays, setCheckedDays] = useState({});

  useEffect(() => {
    // Load checked days from AsyncStorage
    const loadCheckedDays = async () => {
      try {
        const savedCheckedDays = await AsyncStorage.getItem('checkedDays');
        if (savedCheckedDays) {
          setCheckedDays(JSON.parse(savedCheckedDays));
        }
      } catch (error) {
        console.error("Error loading checked days: ", error);
      }
    };

    loadCheckedDays();
  }, []);

  const handleDayPress = async (dayIndex) => {
    const updatedCheckedDays = { ...checkedDays, [dayIndex]: !checkedDays[dayIndex] };
    setCheckedDays(updatedCheckedDays);

    try {
      await AsyncStorage.setItem('checkedDays', JSON.stringify(updatedCheckedDays));
    } catch (error) {
      console.error("Error saving checked days: ", error);
    }
  };

  const renderDay = (dayIndex) => {
    const isChecked = checkedDays[dayIndex];

    return (
      <TouchableOpacity
        key={dayIndex}
        style={[styles.day, isChecked && styles.checkedDay]}
        onPress={() => handleDayPress(dayIndex)}
      >
        <Text style={[styles.dayText, isChecked && styles.checkedDayText]}>
          {dayIndex}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar Tracker</Text>
      <ScrollView contentContainerStyle={styles.calendar}>
        {Array.from({ length: totalDays }, (_, i) => renderDay(i + 1))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Roy Cuadra @2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // This will push the footer to the bottom
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 5,
    color: '#333',
    letterSpacing: 0.5,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 40,         // Adding padding to the top
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  checkedDay: {
    backgroundColor: '#6200ea',
  },
  dayText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  checkedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: 'black',
    fontSize: 16,

  },
});
