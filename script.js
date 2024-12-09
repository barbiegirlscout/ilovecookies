// Function to fetch and process the CSV file
async function fetchCookieData() {
    const response = await fetch('https://github.com/barbiegirlscout/ilovecookies/blob/263cc82a913746a4e13eae02a99222d552389224/cookie_data2025_TEST.csv');
    const data = await response.text();

    // Parse the CSV into rows
    const rows = data.split('\n').map(row => row.split(','));

    // Extract the header and data rows
    const headers = rows[0];
    const dataRows = rows.slice(1).filter(row => row.length > 1); // Remove empty rows

    return { headers, dataRows };
}

// Function to generate random girls and display their information
async function generateRandomGirls() {
    const { dataRows } = await fetchCookieData();

    // Randomly pick 3 girls
    const randomGirls = [];
    while (randomGirls.length < 3) {
        const randomIndex = Math.floor(Math.random() * dataRows.length);
        const girl = dataRows[randomIndex];
        if (!randomGirls.includes(girl)) {
            randomGirls.push(girl);
        }
    }

    // Clear previous results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Display the results
    randomGirls.forEach((girl, index) => {
        const name = girl[5]; // Column F is "Girl First Name"
        const siteID = girl[9]; // Column J is "Site URLID"
        const url = `https://digitalcookie.girlscouts.org/council/636/${siteID}`;

        // Create a result element
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        resultElement.innerHTML = `<strong>${name}</strong> - <a href="${url}" target="_blank">${url}</a>`;

        // Append the result to the container
        resultsContainer.appendChild(resultElement);
    });
}

// Attach the function to the button click event
document.getElementById('find-cookies').addEventListener('click', generateRandomGirls);
