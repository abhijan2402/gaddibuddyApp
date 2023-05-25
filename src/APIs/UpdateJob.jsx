import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateStatus = async () => {
    console.log("I am update job");
    const value = await AsyncStorage.getItem('ScheduledId')
    console.log(value);
    const ScheduledId = JSON.parse(value)
    if (value !== null) {
        try {
            const data = "Complete"
            const response = await fetch(`https://gaadibuddy.com/api/scheduledJobs/${ScheduledId}`, {
                method: "PATCH", // or 'PUT'
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serviceStatus: "Complete"
                })
            });
            const result = await response.json();
            // console.log(result, "i am result");
        } catch (error) {
            console.log(error, "dmekrnfrfm");
        }
    }
}