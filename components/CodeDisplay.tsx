// components/CodeDisplay.tsx
import React, { useState } from "react";
import { Box, Select, Text, useColorModeValue } from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer";
import { useTranslations } from "next-intl";

const languages = [
  "c",
  "cpp",
  "go",
  "java",
  "javascript",
  "python",
  "ruby",
] as const;
type Language = (typeof languages)[number];

interface CodeDisplayProps {
  codeExamples: Record<Language, string>;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ codeExamples }) => {
  const t = useTranslations("CodeDisplay");
  const [language, setLanguage] = useState<Language>("javascript");

  const getLanguageIdentifier = (lang: Language): string => {
    switch (lang) {
      case "c":
        return "c";
      case "cpp":
        return "cpp";
      case "go":
        return "go";
      case "java":
        return "java";
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "ruby":
        return "ruby";
      default:
        return "javascript";
    }
  };
  const bgColor = useColorModeValue("white", "gray.800");
  const CodeTheme = useColorModeValue("light", "dark");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={4}
      bg={bgColor}
      boxShadow="md"
      borderColor={borderColor}
    >
      <Text mb={2}>{t("selectLanguage")}</Text>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        mb={4}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {t(`languages.${lang}`)}
          </option>
        ))}
      </Select>
      <Box borderRadius="md" overflow="hidden">
        <Highlight
          theme={CodeTheme === "light" ? themes.github : themes.dracula}
          code={codeExamples[language]}
          language={getLanguageIdentifier(language)}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{ ...style, padding: "20px", overflowX: "auto" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </Box>
    </Box>
  );
};

export default CodeDisplay;
