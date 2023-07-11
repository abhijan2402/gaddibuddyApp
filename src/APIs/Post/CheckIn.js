export const CheckIn = async (cleanerID) => {
    try {
        const response = await fetch(`https://gaadibuddy.com/api/cleaners/checkIn/${cleanerID}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Success:", result);
        if (result == "Checked In Successfully") {
            alert("Checked In Successfully")
            return true
        }

        if (result == "Already Checked In for this date.") {
            alert("Already Checked In for this date")
            return true
        }
    } catch (error) {
        alert(error, "Issue in Check In")
        return false
    }
}