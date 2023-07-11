export const CheckOut = async (cleanerID) => {
    try {
        const response = await fetch(`https://gaadibuddy.com/api/cleaners/checkOut/${cleanerID}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Success:", result);
        if (result == "Checked Out Successfully") {
            alert("Checked Out Successfully")
            return true
        }
        if (result == "Check Out for this Date is already available") {
            alert("Check Out for this Date is already available")
            return true
        }
    } catch (error) {
        alert(error, "Issue in Check Out")
        return false
    }
}