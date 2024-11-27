import { HStack, Button, Text, Input, FormControl } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { usePaginationLogic } from '../hooks/usePaginationLogic';

const Pagination = ({ currentPage, totalPages, onPageChange, isLastPage }) => {
  const {
    pageInput,
    pageNumbers,
    handlePageInputChange,
    handlePageInputKeyPress,
  } = usePaginationLogic(currentPage, totalPages, onPageChange);

  return (
    <HStack spacing={2} justify="center" mt={6} mb={8}>
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
        leftIcon={<ChevronLeftIcon />}
        variant="outline"
      >
        Prev
      </Button>

      {pageNumbers.map(pageNum => (
        <Button
          key={pageNum}
          size="sm"
          variant={pageNum === currentPage ? "solid" : "outline"}
          colorScheme={pageNum === currentPage ? "blue" : "gray"}
          onClick={() => onPageChange(pageNum)}
          isDisabled={pageNum === currentPage}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={isLastPage}
        rightIcon={<ChevronRightIcon />}
        variant="outline"
      >
        Next
      </Button>

      <Text fontSize="sm" color="gray.500" ml={2}>
        Page {currentPage} of {totalPages}
      </Text>

      <FormControl w="100px" ml={2}>
        <Input
          size="sm"
          placeholder="Go to..."
          value={pageInput}
          onChange={handlePageInputChange}
          onKeyPress={handlePageInputKeyPress}
          type="text"
          maxLength={3}
          textAlign="center"
        />
      </FormControl>
    </HStack>
  );
};

export default Pagination;
