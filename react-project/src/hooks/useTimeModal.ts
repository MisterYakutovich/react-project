import { useEffect, useState } from "react";

export function useTimeModal() {
    const [showModal, setShowModal] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [remainingTime, setRemainingTime] = useState(3);
    const closeModal = () => {
        setShowModal(false);
        setRemainingTime(3); 
      };
      useEffect(() => {
        if (showModal) {
            const timerId = setTimeout(() => {
                closeModal();
            }, remainingTime * 1000); // Закрываем модальное окно через оставшееся время 
            const intervalId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId); // Очищаем интервал, когда время истекает return 0;
                    }
                    return prevTime - 1; // Уменьшаем оставшееся время
                });
            }, 1000); // Обновляем каждую секунду

            setTimer(timerId); // Устанавливаем таймер

            return () => {
                clearTimeout(timerId); // Очищаем таймер при размонтировании
                clearInterval(intervalId); // Очищаем интервал при размонтировании 
            };
        }
    }, [showModal]);
    return {showModal,setShowModal, remainingTime}
}