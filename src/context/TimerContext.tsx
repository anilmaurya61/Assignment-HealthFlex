import React, { createContext, useEffect, useState } from 'react';
import { getTimers, saveTimers, getHistory, saveHistory } from '../utils/storage';
import { Button, Modal, View, StyleSheet, Text } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Toast from 'react-native-toast-message';


export type Timer = {
    id: string;
    name: string;
    duration: number;
    remaining: number;
    category: string;
    status: 'Running' | 'Paused' | 'Completed';
    halfwayAlert: boolean;
};

export type TimerHistory = {
    name: string;
    duration: string;
    completedAt: string;
};

type TimerContextType = {
    timers: Timer[];
    history: TimerHistory[];
    addTimer: (timer: Timer) => void;
    updateTimer: (id: string, updates: Partial<Timer> | ((t: Timer) => Timer)) => void;
    setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
    addHistory: (entry: TimerHistory) => void;
    startAllTimersInCategory: (category: string) => void;
    pauseAllTimersInCategory: (category: string) => void;
    resetAllTimersInCategory: (category: string) => void;
};

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [timers, setTimers] = useState<Timer[]>([]);
    const [history, setHistory] = useState<TimerHistory[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [completedTimersQueue, setCompletedTimersQueue] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const savedTimers = await getTimers();
            const savedHistory = await getHistory();
            setTimers(savedTimers);
            setHistory(savedHistory);
        })();
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers) => {
                const updatedTimers: Timer[] = prevTimers.map((timer) => {
                    if (timer.status === 'Running' && timer.remaining > 0) {
                        const newRemaining = timer.remaining - 1;
                        const halfwayPoint = Math.floor(timer.duration / 2);
                        const isCompleted = newRemaining <= 0;
                        if (newRemaining == halfwayPoint && timer.halfwayAlert) {
                            Toast.show({
                                type: 'info',
                                text1: `"${timer.name}" is halfway done! 🎉`,
                                position: 'top',
                            });
                        }
                        if (isCompleted) {
                            addHistory({
                                name: timer.name,
                                duration: `${timer.duration} seconds`,
                                completedAt: new Date().toISOString(),
                            });
                            setCompletedTimersQueue(prev => [...prev, timer.name]);
                            setShowModal(true);
                        }

                        return {
                            ...timer,
                            remaining: newRemaining,
                            status: isCompleted ? 'Completed' : 'Running',
                        };
                    }
                    return timer;
                });

                saveTimers(updatedTimers);
                return updatedTimers;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const addTimer = (timer: Timer) => {
        const updated = [...timers, timer];
        setTimers(updated);
        saveTimers(updated);
    };

    const updateTimer = (id: string, updates: Partial<Timer> | ((t: Timer) => Timer)) => {
        const updated = timers.map((t) => {
            if (t.id === id) {
                const newVal = typeof updates === 'function' ? updates(t) : { ...t, ...updates };
                return newVal;
            }
            return t;
        });
        setTimers(updated);
        saveTimers(updated);
    };

    const addHistory = (entry: TimerHistory) => {
        setHistory(prevHistory => {
            const updated = [...prevHistory, entry];
            saveHistory(updated);
            return updated;
        });
    };


    const startAllTimersInCategory = (category: string) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.category === category ? { ...timer, status: 'Running' } : timer
            )
        );
    };

    const pauseAllTimersInCategory = (category: string) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.category === category ? { ...timer, status: 'Paused' } : timer
            )
        );
    };

    const resetAllTimersInCategory = (category: string) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.category === category
                    ? { ...timer, remaining: timer.duration, status: 'Paused' }
                    : timer
            )
        );
    };

    const closeModal = () => {
        setShowModal(false);
        setCompletedTimersQueue([]);
    };

    return (
        <TimerContext.Provider value={{
            timers,
            history,
            addTimer,
            updateTimer,
            setTimers,
            addHistory,
            startAllTimersInCategory,
            pauseAllTimersInCategory,
            resetAllTimersInCategory
        }}>
            {children}
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Congratulations!🎉</Text>
                        <Text style={styles.modalMessage}>
                            Timer{completedTimersQueue.length > 1 ? 's' : ''} "{completedTimersQueue.join(', ')}" {completedTimersQueue.length > 1 ? 'have' : 'has'} completed.
                        </Text>
                        <ConfettiCannon
                            count={500}
                            origin={{ x: 0, y: 0 }}
                            fadeOut
                        />
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </TimerContext.Provider>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' as const,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center' as const,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalMessage: {
        fontSize: 16,
        marginVertical: 10,
    },
});
