// components/SortingVisualizer.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  HStack,
  Slider,
  useColorModeValue,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import * as d3 from "d3";

interface SortingVisualizerProps {
  algorithm: string;
  customArray?: number[];
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  algorithm,
  customArray,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const [speed, setSpeed] = useState(50);
  const toast = useToast();
  const t = useTranslations("SortingVisualizer");

  const resetData = useCallback(() => {
    const newData = Array.from(
      { length: 30 },
      () => Math.floor(Math.random() * 100) + 1,
    );
    setData(newData);
    updateVisualization(newData);
  }, []);
  useEffect(() => {
    if (customArray && customArray.length > 0) {
      setData(customArray);
      updateVisualization(customArray);
    } else {
      resetData();
    }
  }, [customArray, resetData]);

  const updateVisualization = (
    currentData: number[],
    highlightIndices: number[] = [],
  ) => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(currentData.map((_, i) => i.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(currentData) || 0])
      .range([height, 0]);

    svg
      .selectAll(".bar")
      .data(currentData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => xScale(i.toString()) || 0)
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - yScale(d))
      .attr("fill", (_, i) => (highlightIndices.includes(i) ? "red" : "teal"));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const n = data.length;
    const newData = [...data];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (newData[j] > newData[j + 1]) {
          [newData[j], newData[j + 1]] = [newData[j + 1], newData[j]];
          setData([...newData]);
          updateVisualization(newData, [j, j + 1]);
          await delay(100 - speed);
        }
      }
    }
  };

  const insertionSort = async () => {
    const arr = [...data];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setData([...arr]);
        updateVisualization(arr, [j + 1, i]);
        await delay(100 - speed);
      }

      arr[j + 1] = key;
      setData([...arr]);
      updateVisualization(arr, [j + 1]);
      await delay(100 - speed);
    }
  };

  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setData([...arr]);
        updateVisualization(arr, [i, j]);
        await delay(100 - speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setData([...arr]);
    updateVisualization(arr, [i + 1, high]);
    await delay(100 - speed);

    return i + 1;
  };

  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (
    arr: number[],
    left: number,
    mid: number,
    right: number,
  ) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      setData([...arr]);
      updateVisualization(arr, [k - 1]);
      await delay(100 - speed);
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      setData([...arr]);
      updateVisualization(arr, [k - 1]);
      await delay(100 - speed);
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      setData([...arr]);
      updateVisualization(arr, [k - 1]);
      await delay(100 - speed);
    }
  };

  const selectionSort = async () => {
    const arr = [...data];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        updateVisualization(arr, [minIdx, j]);
        await delay(100 - speed);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setData([...arr]);
        updateVisualization(arr, [i, minIdx]);
        await delay(100 - speed);
      }
    }
  };
  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setData([...arr]);
      updateVisualization(arr, [i, largest]);
      await delay(100 - speed);
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async () => {
    const arr = [...data];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setData([...arr]);
      updateVisualization(arr, [0, i]);
      await delay(100 - speed);
      await heapify(arr, i, 0);
    }
  };

  const handleSort = async () => {
    if (isSorting) {
      toast({
        title: t("sortingAlreadyInProgress"),
        description: t("pleaseWait"),
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSorting(true);

    switch (algorithm) {
      case "bubble-sort":
        await bubbleSort();
        break;
      case "quick-sort":
        await quickSort(data, 0, data.length - 1);
        break;
      case "merge-sort":
        await mergeSort([...data], 0, data.length - 1);
        break;
      case "insertion-sort":
        await insertionSort();
        break;
      case "selection-sort":
        await selectionSort();
        break;
      case "heap-sort":
        await heapSort();
        break;
      default:
        console.error("Unknown sorting algorithm");
    }

    setIsSorting(false);
    toast({
      title: t("sortingCompleted"),
      description: t("pleaseWait"),
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <VStack spacing={4} align="stretch">
      <Box borderWidth={1} borderRadius="lg" p={4} bg={bgColor} boxShadow="md">
        <svg ref={svgRef}></svg>
      </Box>
      <HStack justifyContent="space-between">
        <Button onClick={resetData} colorScheme="blue" isDisabled={isSorting}>
          {t("reset")}
        </Button>
        <Button onClick={handleSort} colorScheme="teal" isDisabled={isSorting}>
          {isSorting ? t("stop") : t("sort")}
        </Button>
      </HStack>
      <HStack>
        <Text>{t("speed")}</Text>
        <Slider
          value={speed}
          onChange={setSpeed}
          min={1}
          max={99}
          width="150px"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
    </VStack>
  );
};

export default SortingVisualizer;
