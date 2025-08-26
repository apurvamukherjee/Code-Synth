import { ChakraProvider } from '@chakra-ui/react';

const ChakraUIIntegration = ({ children }) => {
    return (
        <ChakraProvider>
            {children}
        </ChakraProvider>
    );
};

export default ChakraUIIntegration;