# ETA Calculator

## 1. What the tool does
The ETA (Estimated Time of Arrival/Achievement) Calculator is a precision estimation tool that predicts when a repetitive task or a bulk process will be completed. It uses the mathematical principle of **proportionality** (also known as the "Rule of Three") to derive an end time based on your current progress and rate of consumption.

By providing the total amount of work to be done and a known sample of work performed over a specific time duration, the tool calculates the total remaining duration and adds it to your starting timestamp to provide a specific date and time of completion. It handles time unit conversions automatically, allowing you to input rates in milliseconds, seconds, minutes, hours, or days.

## 2. Why someone uses it
Estimation is notoriously difficult for the human brain, which tends to be overly optimistic or fails to account for the cumulative effect of small durations over large volumes.

Users leverage this tool to:
- **Project Management:** Estimating when a large data migration involving millions of rows will finish based on the first few thousand rows processed.
- **Development & DevOps:** Predicting the completion time of long-running CI/CD builds, database indexing, or file uploads.
- **Logistics & Operations:** Calculating when a manufacturing run or a shipping process will conclude.
- **Personal Productivity:** Estimating how long it will take to finish reading a book, grading papers, or cleaning a large space based on initial performance.
- **Resource Allocation:** Determining if a process will finish before a critical deadline or a scheduled maintenance window.

## 3. Step-by-step instructions
The tool requires three primary pieces of data to function:

1.  **Set the Total Goal:** In the "Amount of element to consume" field, enter the total number of units you need to process (e.g., 500 files, 10,000 database rows).
2.  **Set Start Time:** Select the date and time when the process began using the "The consumption started at" picker. This defaults to the current time.
3.  **Define the Rate:** This is the most critical part. You must provide a "sample" of your work:
    - **Units:** How many elements did you just process? (e.g., "5")
    - **Time:** How long did it take? (e.g., "3")
    - **Unit:** Select the time scale for that duration (e.g., "minutes").
4.  **Read the Results:**
    - **Total Duration:** The tool will show the total time required for the *entire* task (e.g., "5 hours").
    - **It will end:** A human-readable relative timestamp (e.g., "today at 4:30 PM") indicating when the goal will be reached.

## 4. Examples

### Data Migration
- **Total Work:** 1,000,000 rows
- **Start Time:** 09:00 AM
- **Rate Sample:** 5,000 rows in 2 minutes.
- **Result:** The tool will calculate that 1,000,000 rows will take 400 minutes (6 hours and 40 minutes). The ETA will be 03:40 PM.

### File Upload
- **Total Work:** 450 files
- **Start Time:** Now
- **Rate Sample:** 10 files in 45 seconds.
- **Result:** Total duration will be 33 minutes and 45 seconds. The tool provides the exact time of completion.

### Manual Labor (The "Plate" Example)
- **Total Work:** 500 plates
- **Rate Sample:** 5 plates in 3 minutes.
- **Result:** 300 minutes (5 hours).

## 5. FAQs

**Q: How accurate is the ETA?**
A: The tool is mathematically perfect based on the numbers provided. However, its real-world accuracy depends entirely on the **consistency** of your rate. If your processing speed fluctuates, the ETA will also change.

**Q: Can I use this for non-numeric work?**
A: Yes, as long as you can quantify it. Instead of "files," you could use "percentage." If you finished 2% in 10 minutes, set "Amount to consume" to 100 and "Sample" to 2 in 10 minutes.

**Q: Does it account for breaks or "off" hours?**
A: No. The calculator assumes a continuous, linear rate of work. If your process stops at night and resumes in the morning, you would need to adjust the start time or manually calculate the offset.

**Q: What is the "Time Span Unit Multiplier"?**
A: This is an internal technical value that allows the tool to convert your selected unit (e.g., "Hours") into milliseconds so it can perform calculations using the JavaScript `Date` object.

## 6. Common mistakes
- **Inconsistent Units:** Mixing units (e.g., trying to calculate "meters per second" but inputting the total as "kilometers") will result in an incorrect ETA. Ensure your "Amount to consume" and "Sample units" use the same metric.
- **Small Sample Sizes:** Calculating an ETA based on a 1-second sample for a 10-hour job is risky. Small variations in the sample are magnified over large totals. It's better to wait for a larger, more stable sample before trusting the ETA.
- **Ignoring Overhead:** Forgetting to account for "startup" or "cleanup" time that doesn't happen at the same rate as the main task.
- **Start Time Errors:** If you set the "Started at" time to *now* but you've actually been working for an hour, the "End at" time will be pushed an hour too far into the future.

## 7. Use cases
- **3D Rendering:** Estimating when a frame-by-frame animation will finish rendering.
- **Batch Image Processing:** Using a tool like Photoshop or ImageMagick to resize thousands of photos.
- **Web Scraping:** Monitoring the progress of a crawler as it moves through a site map.
- **Wait Times:** Estimating how much longer a queue will take if you know how many people are served every 5 minutes.
- **Fitness:** Predicting a marathon finish time based on your current pace per kilometer.

## 9. Technical Deep Dive: The Math of Prediction
At its core, the ETA Calculator is an implementation of linear extrapolation. It assumes that the rate of work ($R$) is constant.

### The Core Formula
The tool calculates the rate as:
$$R = \frac{Units_{Sample}}{Time_{Sample}}$$

Then, it determines the total time required ($T_{Total}$) to reach the goal ($G$):
$$T_{Total} = \frac{G}{R}$$

Finally, it calculates the completion timestamp by adding the total duration to the start time ($S$):
$$ETA = S + T_{Total}$$

### Handling Millisecond Precision
Inside the JavaScript engine, time is handled as the number of milliseconds since the Unix Epoch (January 1, 1970). The tool converts all user inputs (seconds, minutes, hours) into milliseconds before performing the division. This prevents "floating point drift" that can occur when repeatedly dividing small fractions of an hour.

### The "FormatDuration" Service
The human-readable output (e.g., "5 hours 30 minutes") is generated by a custom service that breaks down the total millisecond count into its largest possible components. It uses a hierarchical modulo operation to strip out hours, then minutes from the remainder, and finally seconds, ensuring a clean and intuitive display.

## 10. Improving Estimation Accuracy
Linear extrapolation is powerful but has limits. To get the most out of the ETA Calculator, consider these advanced strategies:

### The "Steady State" Principle
Most processes have a "warm-up" period where they are slower (e.g., a database cache filling up or a human getting into a "flow" state). For the most accurate ETA, wait until the process has been running for at least 10% of its expected duration before taking your sample.

### Rolling Averages
If you are monitoring a very long process, don't just use the rate from the very beginning. Instead, take a "rolling sample"—how many units were done in the *last* 15 minutes? Enter those values into the tool to get a "current" ETA that reflects recent performance changes (like network congestion or system thermal throttling).

### Accounting for Non-Linearity
Some tasks are naturally non-linear. For example, compressing files becomes slower as the files get larger. In these cases, the ETA should be treated as a "best-case scenario" rather than a hard guarantee.
