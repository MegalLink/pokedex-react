import { useState } from 'react';

export const usePaginationLogic = (currentPage, totalPages, onPageChange) => {
  const [pageInput, setPageInput] = useState('');

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    // Solo permitir números
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const pageNumber = parseInt(pageInput);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
        setPageInput('');
      }
    }
  };

  return {
    // Estado
    pageInput,
    pageNumbers: getPageNumbers(),
    
    // Handlers
    handlePageInputChange,
    handlePageInputKeyPress,
  };
};
