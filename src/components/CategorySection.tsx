// src/components/CategorySection.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { TimerContext, Timer } from '../context/TimerContext';
import TimerCard from './TimerCard';

type CategorySectionProps = {
  category: string;
  timers: Timer[];
};

const CategorySection = ({ category, timers }: CategorySectionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { startAllTimersInCategory, pauseAllTimersInCategory, resetAllTimersInCategory } =
    useContext(TimerContext);

  const filteredTimers = timers.filter((timer) => timer.category === category);

  const handleToggle = () => setExpanded((prev) => !prev);
  const handleStartAll = () => startAllTimersInCategory(category);
  const handlePauseAll = () => pauseAllTimersInCategory(category);
  const handleResetAll = () => resetAllTimersInCategory(category);

  const renderItem = ({ item }: { item: Timer }) => (
    <TimerCard timer={item} />
  );

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.header} onPress={handleToggle}>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.toggle}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={handleStartAll}>
          <Text style={styles.buttonText}>Start All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePauseAll}>
          <Text style={styles.buttonText}>Pause All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResetAll}>
          <Text style={styles.buttonText}>Reset All</Text>
        </TouchableOpacity>
      </View>

      {expanded && (
        <FlatList
          data={filteredTimers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggle: {
    fontSize: 16,
    color: '#6F826A',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6F826A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  timerCard: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 6,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 14,
    color: '#555',
  },
});

export default CategorySection;
