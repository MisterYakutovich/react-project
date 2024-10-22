import { useEffect, useState } from 'react';

export function useTimeModal() {
  const [showModal, setShowModal] = useState(false);
  const [, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(3);
  const closeModal = () => {
    setShowModal(false);
    setRemainingTime(3);
  };
  useEffect(() => {
    if (showModal) {
      const timerId = setTimeout(() => {
        closeModal();
      }, remainingTime * 1000);
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimer(timerId);

      return () => {
        clearTimeout(timerId);
        clearInterval(intervalId);
      };
    }
  }, [showModal]);
  return { showModal, setShowModal, remainingTime };
}
