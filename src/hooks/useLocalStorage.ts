import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    // Function to get initial value from localStorage or use provided initialValue
    const getInitialValue = () => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error('Error retrieving value from localStorage:', error);
            return initialValue;
        }
    };

    // State to hold the current value
    const [value, setValue] = useState<T>(getInitialValue);

    // Update local storage whenever the value changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error storing value in localStorage:', error);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
