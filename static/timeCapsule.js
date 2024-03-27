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
        const styledText = styleAIResponse(data.text);
        const historyContainer = document.getElementById("historyContainer");
        historyContainer.innerHTML = ''; // Clear existing content

        // Safely append new content
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(styledText, 'text/html');
        parsedHtml.body.childNodes.forEach(node => {
            historyContainer.appendChild(node);
        });
    } catch (error) {
        console.error("Error fetching historical information:", error);
        document.getElementById("historyContainer").innerText = "Error fetching historical information.";
    }
}

function styleAIResponse(text) {
    // Convert **text** to <strong>text</strong>
    let styledText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert * text to list items
    styledText = styledText.replace(/^\* (.*?)(?=\n|$)/gm, '<li>$1</li>');

    // Wrap <strong> elements that are not inside list items with <br>
    styledText = styledText.split('\n').map(line => {
        // Add <br> only if the line has <strong> and is not a list item
        if (line.includes('<strong>') && !line.startsWith('<li>')) {
            return `<br>${line}<br>`;
        }
        return line;
    }).join('\n');

    // If there are any <li> elements, wrap them in <ul>
    if (styledText.includes('<li>')) {
        styledText = `<ul>${styledText}</ul>`;
    }

    return styledText;
}



// Expose function to window for direct HTML button onclick access
window.fetchHistoricalInfo = fetchHistoricalInfo;