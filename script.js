const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalmages = 0;

// Unsplash API

// Set numPhotos to 5 to speed up initial page load time
let numPhotos = 5;
const apiKey = 'API_KEY'
const apiUrl = `https://api.unsplash.com/photos/random/?count=`

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalmages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalmages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each photo is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });    
}

let headers = new Headers({
    "Authorization" : `Client-ID ${apiKey}`
});

// Get photos from Unsplash API

async function getPhotos(numPhotos) {
    try {
        const response = await fetch(`${apiUrl}${numPhotos}`, {
            headers: headers
        });
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        loader.hidden = true;
        const message = document.createElement('p');
        message.classList.add('error-message');
        message.innerText = "There was an error connecting to unsplash API - Please reload the page";
        imageContainer.appendChild(message);
        
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos(numPhotos);
    }
})


// On Load
getPhotos(numPhotos);
// Set numPhotos to 10 after initial page load
numPhotos = 10;