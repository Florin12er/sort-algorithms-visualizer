// components/SortingAlgorithmComparison.tsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useColorMode } from "@chakra-ui/react";

const algorithms = [
  {
    name: "Quick Sort",
    complexity: "O(n log n)",
    performance: 95,
    color: "#4ECDC4",
  },
  {
    name: "Heap Sort",
    complexity: "O(n log n)",
    performance: 90,
    color: "#6BCB77",
  },
  {
    name: "Merge Sort",
    complexity: "O(n log n)",
    performance: 85,
    color: "#45B7D1",
  },
  {
    name: "Insertion Sort",
    complexity: "O(n^2)",
    performance: 60,
    color: "#FFA07A",
  },
  {
    name: "Selection Sort",
    complexity: "O(n^2)",
    performance: 40,
    color: "#FF9FF3",
  },
  {
    name: "Bubble Sort",
    complexity: "O(n^2)",
    performance: 20,
    color: "#FF6B6B",
  },
];

const SortingAlgorithmComparison: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove(); // Clear existing content

      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Sort algorithms by performance (descending order)
      const sortedAlgorithms = [...algorithms].sort(
        (a, b) => b.performance - a.performance,
      );

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(sortedAlgorithms.map((d) => d.name))
        .padding(0.2);

      const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      // X axis
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", colorMode === "dark" ? "white" : "black");

      // Y axis
      g.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .selectAll("text")
        .style("fill", colorMode === "dark" ? "white" : "black");

      // Bars
      g.selectAll("mybar")
        .data(sortedAlgorithms)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.name) || 0)
        .attr("y", (d) => y(d.performance))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.performance))
        .attr("fill", (d) => d.color);

      // Labels
      g.selectAll(".label")
        .data(sortedAlgorithms)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => (x(d.name) || 0) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.performance) - 5)
        .attr("text-anchor", "middle")
        .text((d) => d.complexity)
        .style("fill", colorMode === "dark" ? "white" : "black");

      // Title
      svg
        .append("text")
        .attr("x", width / 2 + margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("fill", colorMode === "dark" ? "white" : "black");
    }
  }, [colorMode]);

  return (
    <svg className="d3-component" width={600} height={400} ref={d3Container} />
  );
};

export default SortingAlgorithmComparison;
