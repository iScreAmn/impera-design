import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal state
 * 
 * @returns {Object} Object containing modal state and control functions
 * @property {boolean} isOpen - Current state of the modal
 * @property {Function} openModal - Function to open the modal
 * @property {Function} closeModal - Function to close the modal
 * @property {Function} toggleModal - Function to toggle the modal state
 */
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

export default useModal;

