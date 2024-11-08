import { useEffect, useState } from 'react';

export function useTimeModal() {
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const closeModal = () => {
    setShowModal(false);
    setRemainingTime(3);
  };
  useEffect(() => {
    if (showModal) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  });
  useEffect(() => {
    if (remainingTime === 0) {
      closeModal();
    }
  }, [remainingTime]);

  return { showModal, setShowModal, remainingTime };
}
