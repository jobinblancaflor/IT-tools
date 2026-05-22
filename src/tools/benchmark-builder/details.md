# Benchmark Builder: Comprehensive Performance Analysis Guide

## 1. What the Tool Does
The Benchmark Builder is a specialized utility designed for developers and systems engineers to aggregate, analyze, and compare performance data across multiple execution "suites." Unlike simple "stopwatch" timers, this tool provides a statistical framework for understanding the consistency and reliability of code execution.

The tool allows users to define multiple suites (representing different algorithms, hardware configurations, or environments) and input multiple data points (samples) for each. It then automatically computes:
- **Mean (Average):** The central tendency of the performance data.
- **Variance:** A measure of how much the data points deviate from the mean, indicating the "noise" or instability of the test environment.
- **Relative Comparison:** Automatic calculation of the delta (difference) and ratio (multiplier) between the best-performing suite and all others.

The output is presented in a clean, sorted table that highlights the "winner" and provides exportable formats for documentation or team communication.

## 2. Why Someone Uses It
Performance measurement is notoriously difficult due to environmental noise, background processes, and hardware variability. This tool addresses several critical needs:

### Eliminating "One-Off" Fallacies
A single execution of a function might be fast due to a lucky cache hit, or slow due to a background system update. By requiring multiple samples, the Benchmark Builder forces developers to look at the *average* behavior, which is a much more reliable predictor of real-world performance.

### Quantifying Environmental Noise
The Variance calculation is one of the tool's most powerful features. A high variance indicates that the results are inconsistent. This might signal that the benchmarking environment is "noisy" (other apps are running), the CPU is thermal throttling, or the code being tested has unpredictable execution paths.

### Objective Comparison
When choosing between two libraries or two versions of an algorithm, developers need more than a "feeling." This tool provides hard numbers like "Algorithm B is 1.4x slower than Algorithm A," making architectural decisions defensible.

## 3. Step-by-Step Instructions

### Step 1: Define Your Suites
Start by naming your suites. For example, if you are comparing two sorting algorithms, name them "QuickSort" and "MergeSort." By default, the tool provides two suites to get you started.

### Step 2: Input Sample Data
For each suite, enter the timing results of your tests. These should ideally be the result of multiple independent runs. 
- *Pro Tip:* Use a consistent unit (like milliseconds or microseconds) for all values.
- You can add or remove suites using the "Add suite" and "Delete suite" buttons.

### Step 3: Set the Unit
Enter the unit of measurement (e.g., `ms`, `μs`, `ops/sec`) in the "Unit" field. This unit will be applied to all calculations and reflected in the comparison strings.

### Step 4: Analyze Results
Observe the results table. The tool automatically sorts the suites from fastest (top) to slowest (bottom). 
- Look at the **Mean** to see which is fastest.
- Look at the **Variance** to see which is most stable.
- Check the **Comparison** column to see exactly how much slower the other suites are compared to the leader.

### Step 5: Export Data
Use the "Copy as markdown table" button to generate a formatted table for your GitHub PR or README. Alternatively, use "Copy as bullet list" for a quick summary in a Slack or Discord message.

## 4. Examples

### Scenario: Comparing String Concatenation
**Suite 1 (String +):** `[150, 155, 148, 160, 152]`  
**Suite 2 (Array.join):** `[90, 92, 88, 95, 91]`

**Result Table:**
1. **Array.join:** Mean: 91.2ms (Best)
2. **String +:** Mean: 153ms (+61.8ms; x1.68)

## 5. Technical Background: Statistics in Benchmarking
To get the most out of this tool, it is helpful to understand the math behind it.

### The Mean vs. The Median
While this tool focuses on the Arithmetic Mean, it is important to remember that the mean can be skewed by "outliers" (values that are much higher or lower than the rest). If you have one sample that is 1000ms while others are 10ms, your mean will be significantly higher.
*Best Practice:* Always run enough samples (at least 10-20) to ensure the mean is a fair representation of the data.

### Variance and Stability
Variance is calculated by taking the average of the squared differences from the Mean. In simple terms:
- **Low Variance:** Your code is predictable.
- **High Variance:** Your environment is unstable. This usually happens if you are benchmarking on a laptop that is also running Chrome, Spotify, and Slack in the background.

## 6. Common Mistakes

- **Mixing Units:** Entering `0.5` (seconds) in one suite and `500` (milliseconds) in another. The tool assumes all numbers are in the same scale.
- **Insufficient Samples:** Using only 2 or 3 samples. This is rarely enough to overcome the noise of modern operating systems.
- **Comparing Incomparable Scenarios:** Benchmarking a "cold" function (first run, no JIT optimization) against a "warm" function (run 1000 times before). Always "warm up" your code before taking the samples you input into this tool.
- **Thermal Throttling:** Running long benchmarks on a battery-powered device. As the CPU gets hot, it will slow down, causing later suites to look artificially slower than earlier ones.

## 7. Use Cases

### Library Evaluation
Comparing the performance of `lodash` vs. native JavaScript methods vs. `ramda`. You can run the same operation with each library and input the results here to see the overhead.

### CI/CD Regression Analysis
If a PR is suspected of slowing down a critical path, you can benchmark the `main` branch vs. the `feature` branch and paste the resulting Markdown table directly into the PR comments.

### Hardware Comparison
Testing the same code on an Intel i7 vs. an Apple M2. Use the suites to represent the different hardware and input the execution times to see the efficiency gains.

### Optimization Validation
Before and after refactoring a complex loop. This tool provides the "before/after" proof that your optimization actually worked.

## 8. Related Tools
- **Chronometer:** For manual timing of events that you can then input into the Benchmark Builder.
- **JSON Formatter:** For cleaning up large sets of raw timing data from logs before extraction.
- **Device Information:** Useful for documenting the environment (browser, OS, screen) where the benchmark was performed.

---
*Technical Note: The Benchmark Builder uses a reactive calculation engine. All statistical operations (summation, averaging, variance calculation) are performed in real-time as you type, ensuring that you can immediately see the impact of adding a new data point.*
