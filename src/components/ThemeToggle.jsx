import { IconButton, useColorMode, Box, keyframes } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      position="fixed"
      bottom="2rem"
      right="2rem"
      zIndex={999}
    >
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        isRound
        size="lg"
        aria-label="Toggle theme"
        colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
        _hover={{
          transform: 'scale(1.1)',
        }}
        sx={{
          '&:hover > svg': {
            animation: `${rotate} 1s linear`,
          },
        }}
        shadow="lg"
      />
    </Box>
  );
};

export default ThemeToggle;
