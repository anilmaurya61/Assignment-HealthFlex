import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Timer, TimerContext } from '../context/TimerContext';
import { Bar } from 'react-native-progress';

type TimerCardProps = {
    timer: Timer;
};

const TimerCard = ({ timer }: TimerCardProps) => {
    const { updateTimer } = useContext(TimerContext);

    const handleStart = () => {
        if (timer.status !== 'Completed') {
            updateTimer(timer.id, { status: 'Running' });
        }
    };

    const handlePause = () => {
        if (timer.status === 'Running') {
            updateTimer(timer.id, { status: 'Paused' });
        }
    };

    const handleReset = () => {
        updateTimer(timer.id, {
            remaining: timer.duration,
            status: 'Paused',
        });
    };

    const progress = (timer.remaining / timer.duration) * 100;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{timer.name}</Text>
            <Text style={styles.text}>Total Duration: {timer.duration} seconds</Text>
            <Text style={styles.text}>Timer Status: {timer.status} </Text>

            <Bar 
  progress={timer.status !== 'Completed' ? 1 - (timer.remaining / timer.duration) : 1} 
  width={null} 
                height={10} 
                borderRadius={5}
                color={'#BBD8A3'}
                unfilledColor={'#ddd'}
            />

            <Text style={styles.progressText}>
                {timer.status === 'Completed' 
                    ? 'Timer Completed!' 
                    : `Time remaining: ${timer.remaining} seconds`}
            </Text>

            <View style={styles.buttonRow}>
                {timer.status !== "Completed" && (
                    timer.status === "Paused" ? (
                        <TouchableOpacity style={styles.button} onPress={handleStart}>
                            <Ionicons name="play" size={20} color="#000" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handlePause}>
                            <Ionicons name="pause" size={20} color="#fff" />
                        </TouchableOpacity>
                    )
                )}
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Ionicons name="refresh" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: '#555',
        paddingBottom: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#555',
        marginTop: 8,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#BBD8A3',
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
    },
});

export default TimerCard;
