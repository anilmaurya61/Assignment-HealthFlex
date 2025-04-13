import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Switch } from 'react-native';
import { TimerContext } from '../context/TimerContext';
import CategorySection from '../components/CategorySection';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
    const { timers, addTimer } = useContext(TimerContext);

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [halfwayAlert, setHalfwayAlert] = useState(false); 

    const handleAddTimer = () => {
        if (!name || !duration || !category) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please fill out name, duration, and category.',
                position: 'top',
            });
            return;
        }

        const parsedDuration = parseInt(duration, 10);
        if (isNaN(parsedDuration)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Duration',
                text2: 'Please enter a valid number for duration.',
                position: 'top',
            });
            return;
        }

        if (parsedDuration <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Duration',
                text2: 'Duration must be greater than zero.',
                position: 'top',
            });
            return;
        }

        const newTimer = {
            id: uuid.v4() as string,
            name,
            duration: parsedDuration,
            remaining: parsedDuration,
            category,
            status: 'Paused' as const,
            halfwayAlert: halfwayAlert,
        };

        addTimer(newTimer);
        Toast.show({
            type: 'success',
            text1: 'Timer Added 🎉',
            text2: `"${name}" has been added successfully.`,
            position: 'top',
        });
        setName('');
        setDuration('');
        setCategory('');
        setHalfwayAlert(false);
    };

    const categories = [...new Set(timers.map((timer) => timer.category))];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Add New Timer</Text>

            <TextInput
                style={styles.input}
                placeholder="Timer Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Duration in seconds"
                placeholderTextColor="#888"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                placeholderTextColor="#888"
                value={category}
                onChangeText={setCategory}
            />
            <View style={styles.checkboxContainer}>
                <Text>Enable Halfway Alert?  </Text>
                <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAddTimer}>
                <Text style={styles.buttonText}>Add Timer</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 24 }}>
                {categories.length === 0 ? (
                    <Text style={styles.noTimers}>No timers found. Add some!</Text>
                ) : (
                    categories.map((cat) => (
                        <CategorySection key={cat} category={cat} timers={timers} />
                    ))
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 50,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    noTimers: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 32,
        color: '#555',
    },
    button: {
        backgroundColor: "#6F826A",
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
});

export default HomeScreen;
