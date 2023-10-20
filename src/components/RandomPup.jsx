import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RandomDog() {
const [dogImage, setDogImage] = useState('');

useEffect(() => {
fetchRandomDog();
}, []);

const fetchRandomDog = () => {
axios.get('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
    if (response.status === 200) {
        setDogImage(response.data.message);
    }
    })
    .catch((error) => {
    console.error('Error fetching random dog:', error);
    });
};

const handleDownloadClick = () => {
    fetch(dogImage)
    .then((response) => response.blob())
    .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'random_dog_image.jpeg';
        anchor.click();

        window.URL.revokeObjectURL(url);
    });
};

return (
    <div className='bg-dark-subtle d-flex flex-column min-vh-100'>
        <div className='container'>
            <h1>Puppy Image Generator</h1>
            <p>Click The Button Below To Generate A Random Pup Pic!</p>
        </div>
        <div>
            <button onClick={fetchRandomDog} className='btn btn-success m-2'>Show Me a New Pup!</button>
            <button onClick={handleDownloadClick} className='btn btn-primary m-2'>Download Image</button>
        </div>
        <div className='d-flex flex-column align-items-center justify-content-center flex-grow-1'>
            {dogImage && (
                <div>
                <img src={dogImage} alt="Random Dog" className='img-fluid' />
                </div>
            )}
        </div>
    </div>
);
}

export default RandomDog;
