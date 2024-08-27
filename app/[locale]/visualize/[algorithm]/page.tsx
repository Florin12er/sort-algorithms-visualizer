// app/[locale]/visualize/[algorithm]/page.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Text,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import SortingVisualizer from "@/components/SortingVisualizer";
import CodeDisplay from "@/components/CodeDisplay";
import AlgorithmDescription from "@/components/AlgorithmDescription";
import CustomArrayInput from "@/components/CustomArrayInput";
import { algorithms } from "@/data/algorithms";
import { algorithms_de } from "@/data/algorithms_de";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function VisualizePage() {
  const t = useTranslations("Visualize");
  const params = useParams();
  const locale = params.locale as string;
  const algorithmKey = params.algorithm as string;

  const currentAlgorithms = locale === "de" ? algorithms_de : algorithms;
  const algorithm =
    currentAlgorithms[algorithmKey as keyof typeof currentAlgorithms];

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("teal.600", "teal.200");
  const [customArray, setCustomArray] = useState<number[]>([]);

  if (!algorithm) {
    return (
      <Box p={8} bg={bgColor}>
        <Text color={textColor}>{t("algorithmNotFound")}</Text>
      </Box>
    );
  }

  const handleCustomArraySubmit = (arr: number[]) => {
    setCustomArray(arr);
  };

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        <HStack justifyContent="space-between">
          <Heading color={textColor}>
            {algorithm.name} {t("visualization")}
          </Heading>
          <HStack spacing={4}>
            <DarkModeToggle />
            <LanguageSwitcher />
            <NextLink href={`/${locale}`} passHref>
              <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme="teal"
                variant="outline"
              >
                {t("backToHome")}
              </Button>
            </NextLink>
          </HStack>
        </HStack>
        <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
          <AlgorithmDescription description={algorithm.description} />
        </Box>
        <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
          <CustomArrayInput onArraySubmit={handleCustomArraySubmit} />
        </Box>
        <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
          <SortingVisualizer
            algorithm={algorithmKey}
            customArray={customArray}
          />
        </Box>
        <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
          <CodeDisplay codeExamples={algorithm.codeExamples} />
        </Box>
        <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4} color={textColor}>
            {t("learningResources")}
          </Heading>
          <UnorderedList spacing={2}>
            {algorithm.resources.map((resource, index) => (
              <ListItem key={index}>
                <Link href={resource.url} isExternal color={linkColor}>
                  {resource.title} <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </VStack>
    </Box>
  );
}
