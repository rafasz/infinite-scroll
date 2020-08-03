// Unsplash API

const count = 10;
const apiKey = 'API_KEY'
const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}`

let headers = new Headers({
    "Authorization" : `Client-ID ${apiKey}`
});

// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl, {
            headers: headers
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Catch Error Here
    }
}


// On Load
getPhotos();