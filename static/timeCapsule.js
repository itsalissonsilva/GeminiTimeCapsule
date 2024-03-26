async function fetchHistoricalInfo() {
    const year = document.getElementById("yearInput").value;
    if (!year) {
        alert("Please enter a year.");
        return;
    }

    try {
        const response = await fetch('/fetch_history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ year: year })
        });

        const data = await response.json();
        document.getElementById("historyContainer").innerText = data.text;
    } catch (error) {
        console.error("Error fetching historical information:", error);
        document.getElementById("historyContainer").innerText = "Error fetching historical information.";
    }
}

// Expose function to window for direct HTML button onclick access
window.fetchHistoricalInfo = fetchHistoricalInfo;