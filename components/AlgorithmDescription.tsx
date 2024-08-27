// components/AlgorithmDescription.tsx
import { Text, useColorModeValue } from "@chakra-ui/react";

interface AlgorithmDescriptionProps {
  description: string;
}

const AlgorithmDescription: React.FC<AlgorithmDescriptionProps> = ({
  description,
}) => {
  const textColor = useColorModeValue("gray.700", "gray.200");

  return <Text color={textColor}>{description}</Text>;
};

export default AlgorithmDescription;
