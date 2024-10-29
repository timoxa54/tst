import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [hoverCount, setHoverCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // Состояние для сообщения

  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVabFfDsas65N4u0FOPruwPwBgjQFdOEuWA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7YbFXALJbgH5c1CnmUfgCvk0meRdOzYf3FA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE7r181P7_pdtyJ0S8ox5d1mbZj-yqGltog&s',
    'https://i.ytimg.com/vi/O0mBTF0B5IU/maxresdefault.jpg',
    'https://i.ytimg.com/vi/iVmpmOqMW8M/maxresdefault.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3MuHWBwpIsvpMyaw8LXOhjYgyf0mgrz56A&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnqvO087G3mD1QkBdKYdPp6tzDFd2HCqtag&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7AvdtgcP3I9XxLmV4sm97TvJdPgrRUirXA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReoUxTnXm8JoOAanXwd8S8Uopqx4RGF-kJBw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkddTMBkNmK09o70Fdm5BGYWtZuVlqv1bRhQ&s'
  ];

  useEffect(() => {
    if (isLooping) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 300);
      return () => clearInterval(intervalId);
    }
  }, [isLooping]);

  const handleYesClick = () => {
    setIsLooping(true);
    setShowMessage(true); // Показываем сообщение при нажатии на кнопку "Да"
  };

  const handleNoHover = () => {
    setHoverCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount < 3) {
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 50);
        setNoButtonStyle({
          position: 'absolute',
          left: `${randomX}px`,
          top: `${randomY}px`,
          transition: 'left 0.2s, top 0.2s',
        });
      }

      return newCount;
    });
  };

  const isNoButtonVisible = hoverCount < 3;

  return (
    <div className="App">
      <h1>Мне нравится Тим?</h1>
      <button className="button" onClick={handleYesClick}>Да</button>
      {isNoButtonVisible && (
        <button
          className="button"
          style={noButtonStyle}
          onMouseEnter={handleNoHover}
        >
          Нет
        </button>
      )}
      <div className="image-container">
        {isLooping && (
          <div
            className="image"
            style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
          />
        )}
      </div>
      {showMessage && <h2>Ты мне тоже очень нравишься, Аделькинс!</h2>} {/* Новое сообщение */}
    </div>
  );
}

export default App;
