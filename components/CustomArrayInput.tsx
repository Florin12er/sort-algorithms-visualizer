// components/CustomArrayInput.tsx
import React, { useState } from "react";
import {
  Input,
  Button,
  Text,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface CustomArrayInputProps {
  onArraySubmit: (arr: number[]) => void;
}

const CustomArrayInput: React.FC<CustomArrayInputProps> = ({
  onArraySubmit,
}) => {
  const t = useTranslations("CustomArrayInput");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const inputBgColor = useColorModeValue("white", "gray.700");

  const handleSubmit = () => {
    const arr = inputValue.split(",").map((num) => parseInt(num.trim()));
    if (arr.some(isNaN)) {
      setError(t("invalidNumbersError"));
      return;
    }
    if (arr.length < 2) {
      setError(t("minNumbersError"));
      return;
    }
    setError("");
    onArraySubmit(arr);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text color={textColor}>{t("instructions")}</Text>
      <HStack>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("inputPlaceholder")}
          bg={inputBgColor}
          color={textColor}
        />
        <Button onClick={handleSubmit} colorScheme="teal">
          {t("submitButton")}
        </Button>
      </HStack>
      {error && <Text color="red.500">{error}</Text>}
    </VStack>
  );
};

export default CustomArrayInput;
