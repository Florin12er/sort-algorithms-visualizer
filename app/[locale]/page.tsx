// app/[locale]/page.tsx
"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { algorithms } from "@/data/algorithms";
import { algorithms_de } from "@/data/algorithms_de";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SortingAlgorithmComparison = dynamic(
  () => import("@/components/SortingAlgorithmComparison"),
  { ssr: false },
);

export default function Dashboard() {
  const t = useTranslations("Index");
  const params = useParams();
  const locale = params.locale as string;

  const [searchTerm, setSearchTerm] = useState("");

  const currentAlgorithms = locale === "de" ? algorithms_de : algorithms;

  const filteredAlgorithms = Object.values(currentAlgorithms).filter((algo) =>
    algo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="2xl" color={headingColor}>
              {t("title")}
            </Heading>
            <HStack>
              <DarkModeToggle />
              <LanguageSwitcher />
            </HStack>
            <Text fontSize="xl" color={textColor} maxW="600px">
              {t("description")}
            </Text>
          </VStack>

          <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md" w="full">
            <Heading size="md" mb={4} color={headingColor}>
              {t("comparisonTitle")}
            </Heading>
            <SortingAlgorithmComparison />
          </Box>

          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="md"
              bg={cardBgColor}
              color={textColor}
            />
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {filteredAlgorithms.map((algo) => (
              <Card
                key={algo.name}
                variant="outline"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                bg={cardBgColor}
                transition="all 0.2s"
              >
                <CardHeader bg="teal.500" py={4}>
                  <Heading size="md" color="white">
                    {algo.name}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color={textColor}>{algo.description}</Text>
                </CardBody>
                <CardFooter>
                  <Link
                    href={`/${locale}/visualize/${algo.path.slice(1)}`}
                    passHref
                    style={{ width: "100%" }}
                  >
                    <Button colorScheme="teal" variant="outline" width="full">
                      {t("visualizeButton")}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
