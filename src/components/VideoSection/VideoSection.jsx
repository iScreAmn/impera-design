import { useState, useRef, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import './VideoSection.css';

function VideoSection({ video }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      // Пробуем запустить видео с звуком
      const playPromise = modalVideoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Если браузер заблокировал автоплей с звуком, пробуем без звука
          console.log('Autoplay with sound blocked, trying muted:', err);
          modalVideoRef.current.muted = true;
          modalVideoRef.current.play().catch((e) => {
            console.log('Autoplay prevented:', e);
          });
        });
      }
    }
  }, [isModalOpen]);

  if (!video) return null;

  return (
    <>
      <section id="project-video" className="video-section">
        <div className="video-section__container">
          <h2 className="video-section__title">{video.title}</h2>
          
          <div className="video-preview" onClick={openModal}>
            <video
              ref={videoRef}
              className="video-preview__player"
              poster={video.poster}
              preload="metadata"
              playsInline
              muted
            >
              {video.sources.map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
              ))}
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
            <div className="video-preview__overlay">
              <button className="video-preview__play-btn" aria-label="Воспроизвести видео">
                <FaPlay />
              </button>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="video-modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="video-modal__close"
            onClick={closeModal}
            aria-label="Закрыть"
          >
            <IoIosClose />
          </button>

          <div className="video-modal__content" onClick={(e) => e.stopPropagation()}>
            <video
              ref={modalVideoRef}
              className="video-modal__player"
              controls
              playsInline
              preload="auto"
              controlsList="nodownload"
            >
              {video.sources.map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
              ))}
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoSection;
