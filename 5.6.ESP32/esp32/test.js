import fs from 'fs';

const password = 'password'; // update as necessary

(async () => {
    try {
        // GET request to fetch globalCount and save to a JSON file
        let response = await fetch('http://localhost:3000/globalCount', {
            headers: { 'x-password': password }
        });
        let data = await response.json();
        fs.writeFileSync('globalCount.json', JSON.stringify(data, null, 2));
        console.log('GET request: Response saved to globalCount.json');

        // POST request to update globalCount
        response = await fetch('http://localhost:3000/globalCount', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-password': password
            },
            body: JSON.stringify({ value: 123 }) // change value as needed
        });
        data = await response.json();
        console.log('POST request:', data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
