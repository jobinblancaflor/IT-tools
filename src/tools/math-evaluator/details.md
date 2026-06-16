# Math Evaluator

## What it does
The Math Evaluator is a powerful tool that parses and solves mathematical expressions. Powered by the comprehensive `mathjs` library, it can handle everything from basic arithmetic to complex algebraic functions, unit conversions, and statistical calculations.

## Why professionals use it
- **Complex Calculations:** Solving equations that are too cumbersome for a standard desktop calculator.
- **Scientific Computing:** Using functions like `sqrt`, `sin`, `log`, and `matrix` operations.
- **Quick Conversions:** Evaluating expressions that involve units (e.g., converting lengths or weights within an expression).
- **Data Analysis:** Performing quick statistical evaluations like `mean`, `median`, or `standard deviation` on a set of numbers.

## Instructions
1. **Enter Expression:** Type your mathematical expression into the input field.
2. **Real-time Result:** The tool evaluates the expression as you type.
3. **View Result:** The calculated answer will appear in a card below the input field. If the expression is invalid or incomplete, no result will be shown until it becomes valid.

## Examples
- **Basic Arithmetic:** `(2 + 3) * 4 / 2` -> `10`
- **Functions:** `sqrt(144) + log(100, 10)` -> `14`
- **Trigonometry:** `sin(45 deg)` -> `0.7071067811865475`
- **Units:** `500 cm to meters` -> `5 m`
- **Complex Numbers:** `sqrt(-4)` -> `2i`

## FAQs
- **What functions are supported?** Almost all functions provided by the `mathjs` library are supported, including trigonometric, logarithmic, algebraic, and statistical functions.
- **Does it support variables?** In its current implementation, it focuses on evaluating direct expressions rather than multi-line scripts with variable assignments.
- **Are calculations precise?** Yes, it uses high-precision floating-point math, though standard IEEE 754 limitations apply for extremely large or small numbers.

## Common Mistakes
- **Missing Parentheses:** Forgetting to close a parenthesis, which makes the expression invalid.
- **Incorrect Units:** Using unit names that the library doesn't recognize (e.g., using `kms` instead of `km`).
- **Function Syntax:** Forgetting that some functions require specific formats (e.g., `sin(45)` assumes radians unless you specify `deg`).

## Use Cases
- **Engineering:** Quickly calculating load distributions or electrical properties.
- **Financial Planning:** Evaluating compound interest formulas or currency-like conversions.
- **Academic Research:** Verifying complex mathematical steps in a paper or homework.
- **Web Development:** Calculating CSS pixel values or grid layouts based on complex ratios.

## Related Tools
- **Percentage Calculator:** Specifically designed for common percentage-based math.
- **Temperature Converter:** Quickly switch between Celsius, Fahrenheit, and Kelvin.
- **Chmod Calculator:** A specialized math tool for Linux file permissions.
