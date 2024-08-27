# Sorting Algorithm Visualizer

## Description

The Sorting Algorithm Visualizer is an interactive web application designed to help users understand and visualize
various sorting algorithms. This project aims to make learning sorting algorithms more intuitive and engaging through
visual representations of the sorting process.

Key features:

- Interactive visualization of popular sorting algorithms
- Customizable array input
- Adjustable sorting speed
- Code examples in multiple programming languages
- Responsive design for desktop and mobile devices
- Internationalization support (English and German)

## Technologies Used

- Next.js
- React
- TypeScript
- Chakra UI
- D3.js for visualizations
- next-intl for internationalization

## Live Demo

Check out the live demo: [Sorting Algorithm Visualizer](https://sort-algorithms-visualizer-six.vercel.app/)

## Installation and Setup

To run this project locally:

1. Clone the repository:

```bash
git clone https://github.com/Florin12er/sort-algorithms-visualizer.git
```

2. Navigate to the project directory:

```bash
cd sorting-algorithm-visualizer
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Hosting on Vercel

To deploy this project on Vercel:

1. Sign up for a Vercel account at [vercel.com](https://vercel.com) if you haven't already.

2. Clone this repository:

```
git clone https://github.com/Florin12er/sort-algorithms-visualizer.git
```

3. Add to your Github via forking or just removing .git directory and adding your new one:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/User/Repository.git
git push -u origin main
```

4. Create a Vercel project and select the github repository and deploy your project.

## Adding New Algorithms

To add a new sorting algorithm to the project:

1. Implement the sorting algorithm, following the structure of existing algorithms.

2. Add the new algorithm to the `algorithms.ts` file in the `data` directory:

```typescript
export const algorithms = {
  // ... existing algorithms
  "new-algorithm": {
    name: "New Algorithm",
    description: "Description of the new algorithm",
    path: "/new-algorithm",
    codeExamples: {
      // Add code examples in different languages
    },
    resources: [
      // Add learning resources
    ],
  },
};
```

3. Update app/[locale]/visualize/[algorithm]/page.tsx to include the new algorithm's visualization.

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
