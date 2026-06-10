# Monitoring and Observability: Setting up a Health Dashboard

In a complex system, "it's not working" is not a useful bug report. To maintain a professional-grade service, you need to move from **Monitoring** (knowing that something is wrong) to **Observability** (knowing *why* it is wrong).

## 1. Monitoring vs. Observability

**Monitoring** is the act of watching a set of predefined metrics. It answers the question: *"Is the system healthy?"*
- Example: "CPU usage is 90%", "HTTP 500 error rate is 2%".

**Observability** is the ability to understand the internal state of a system by examining its external outputs. It answers the question: *"Why is the system behaving this way?"*
- Example: "Request X failed because Service Y timed out after 30 seconds while trying to connect to Database Z."

## 2. The Three Pillars of Observability

To achieve true observability, you need a combination of three data types.

### 1. Metrics (The "What")
Metrics are numerical representations of data measured over intervals of time.
- **System Metrics**: CPU, RAM, Disk I/O.
- **Application Metrics**: Request count, Error rate, Latency (p95, p99).
- **Tooling**: Prometheus for collection, Grafana for visualization.

### 2. Logging (The "Where")
Logs are discrete events. They provide the detailed context needed to debug a specific failure.
- **Structured Logging**: Avoid plain text logs. Use JSON format so logs can be queried like a database.
- **Correlation IDs**: Every request should be assigned a unique ID that follows the request through every microservice.
- **Tooling**: ELK Stack (Elasticsearch, Logstash, Kibana) or Loki.

### 3. Tracing (The "How")
Distributed tracing tracks the path of a single request as it moves through different services.
- **Spans**: A span represents a single operation within a service.
- **Trace**: A collection of spans that form the complete lifecycle of a request.
- **Tooling**: Jaeger or Honeycomb.

## 3. Defining SLIs and SLOs

You cannot monitor everything. You must define what "success" looks like for your users.

### Service Level Indicator (SLI)
A specific quantitative measure of some aspect of the service.
- Example: "The percentage of successful HTTP requests."

### Service Level Objective (SLO)
A target value or range of values for a service level that is measured by an SLI.
- Example: "99.9% of all requests should return a 200 OK response within 200ms."

### Error Budget
The amount of "unreliability" you are allowed to have before you stop developing new features and focus entirely on stability. If your SLO is 99.9%, your error budget is 0.1% of requests.

## 4. Practical Implementation: The Health Dashboard

A professional health dashboard should be organized by "Altitude."

### The Executive View (L1)
- **Traffic**: Total requests per second.
- **Errors**: Global error rate.
- **Latency**: Average response time.
- **Uptime**: Percentage of time the site was reachable.

### The Engineering View (L2)
- **Resource Saturation**: CPU/RAM usage per pod/server.
- **Database Performance**: Slow query logs, connection pool saturation.
- **Dependency Health**: Response times of external APIs.

### The Debugging View (L3)
- **Trace Views**: Waterfall diagrams showing where a specific request spent its time.
- **Log Streams**: Real-time filtered logs for a specific user or correlation ID.

## 5. Summary Checklist for a Healthy System

| Priority | Action | Goal |
|---|---|---|
| **Critical** | Set up basic uptime monitoring | Know when site is down |
| **High** | Implement structured JSON logging | Fast debugging |
| **Medium** | Define 3-5 key SLOs | Measure user experience |
| **Advanced** | Implement distributed tracing | Solve "needle in haystack" bugs |

By moving from "guessing" to "observing," engineers can reduce Mean Time to Recovery (MTTR) from hours to seconds, ensuring a seamless experience for every user.
