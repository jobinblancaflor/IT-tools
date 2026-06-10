# crontab-generator: Professional Cron Expression Architect

## 1. What the Tool Does
`crontab-generator` is a precision utility designed to abstract the complexity of the Unix-standard cron time-specification format. Instead of manually calculating offsets and wildcards, developers provide a human-readable schedule (e.g., "every 3rd Tuesday of the month at 2 PM"), and the tool synthesizes the exact 5-field (or 6-field for some implementations) cron expression.

Unlike basic web-based generators, this tool focuses on **edge-case validation**, ensuring that the generated expressions are compatible with specific cron implementations (Vixie Cron, systemd timers, or Quartz) and alerting the user to "impossible" schedules (e.g., February 31st).

## 2. Why Someone Uses It
Cron syntax is notoriously error-prone. A single misplaced asterisk or an incorrect range can lead to:
- **Production Outages:** Running a heavy database backup every minute instead of every midnight.
- **Silent Failures:** A critical cleanup script that never triggers because of an invalid day-of-week/day-of-month conflict.
- **Developer Friction:** Spending 15 minutes testing a complex expression in a "cron-tester" loop.

Sysadmins and DevOps engineers use `crontab-generator` to move from **intent** ("I want this to run on the last Friday of the month") to **implementation** (`0 0 25-31 * 5`) with mathematical certainty.

## 3. Step-by-Step Instructions

### Basic Generation
1. **Define Intent:** Determine the frequency, time, and specific date constraints.
2. **Input Mapping:** Use the tool's CLI or API to input the requirement.
   - *Example:* `crontab-generator --every \"15 minutes\" --time \"02:00\"`
3. **Validation:** Review the generated expression against the provided "human-readable" translation to ensure logic alignment.
4. **Deployment:** Inject the resulting string into the system crontab via `crontab -e` or a deployment manifest (e.g., Kubernetes `CronJob`).

### Advanced Workflow (Integration)
1. **Schema Definition:** Define your schedules in a YAML/JSON config file.
2. **Bulk Generation:** Pipe the config through `crontab-generator` to produce a full crontab file.
3. **Dry Run:** Use the tool's verification mode to simulate the next 5 trigger dates to confirm the schedule's accuracy.

## 4. Examples

### Standard Use Cases
| Intent | Cron Expression | Explanation |
| :--- | :--- | :--- |
| Every 15 minutes | `*/15 * * * *` | Triggers at :00, :15, :30, :45 |
| Daily at 3:30 AM | `30 3 * * *` | Precise daily execution |
| Every weekday at midnight | `0 0 * * 1-5` | Mon-Fri execution |

### Advanced Usage
- **The "Last Day of Month" Challenge:** 
  Since cron doesn't natively support "L", `crontab-generator` can suggest a shell-wrapper approach:
  `0 0 28-31 * * [ \"$(date +\\%d -d tomorrow)\" = \"01\" ] && /path/to/script.sh`
- **Complex Intervals:**
  "Run every 2 hours, but only between 8 AM and 4 PM on weekdays":
  `0 8-16/2 * * 1-5`

## 5. FAQs
**Q: Does it support seconds?**
A: Standard Unix cron does not. However, the tool supports **Quartz** or **AWS EventBridge** formats if the `--format` flag is specified, allowing for 6-field expressions including seconds.

**Q: How does it handle different timezones?**
A: The generator produces the expression; the execution depends on the system's `TZ` environment variable. For multi-region deployments, it is recommended to generate expressions based on **UTC**.

**Q: Can it detect overlapping jobs?**
A: No. The tool generates the schedule. To prevent overlaps, wrap your command in `flock` or `timeout`.

## 6. Common Mistakes
- **Confusing Day-of-Month and Day-of-Week:** In standard cron, if both are specified, the job runs when *either* matches (OR logic), not both (AND logic).
- **The "Every 5 Minutes" Trap:** Using `5 * * * *` instead of `*/5 * * * *`. The former runs only at the 5th minute of every hour; the latter runs every 5 minutes.
- **Ignoring the Environment:** Forgetting that cron runs with a minimal shell. Always use absolute paths for binaries (e.g., `/usr/bin/python3` instead of `python3`).

## 7. Use Cases (Professional/Industrial)
- **FinTech Batch Processing:** Scheduling end-of-day (EOD) ledger settlements that must trigger exactly at 00:00 UTC after markets close.
- **Log Rotation & Archival:** Complex rotation schedules (e.g., "Archive logs every Sunday at 2 AM, but only if it's the first Sunday of the quarter").
- **Kubernetes Operator Patterns:** Generating `schedule` fields for `CronJob` resources to automate database pruning across distributed clusters.
- **IoT Heartbeats:** Setting staggered check-in intervals for thousands of devices to avoid "thundering herd" API spikes.

## 8. Related Tools
- **`croniter` (Python):** For programmatic iteration over cron schedules in code.
- **`systemd-timer`:** The modern Linux alternative to cron, offering better dependency management and logging.
- **Airflow / Prefect:** For complex DAG-based scheduling where task dependencies are more important than simple time intervals.
- **`crontab-guru`:** A web-based reference for quick visual validation of simple expressions.
