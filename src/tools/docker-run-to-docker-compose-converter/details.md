# Docker Run to Docker Compose Converter

## 1. What the tool does
The **Docker Run to Docker Compose Converter** is a specialized technical utility that parses complex `docker run` CLI commands and transforms them into a structured, declarative `docker-compose.yml` file. 

Instead of manually mapping CLI flags to YAML keys, the tool automates the translation of:
- **Port Mappings**: `-p` $\\rightarrow$ `ports`
- **Volume Mounts**: `-v` $\\rightarrow$ `volumes`
- **Environment Variables**: `-e` $\\rightarrow$ `environment`
- **Network Configurations**: `--network` $\\rightarrow$ `networks`
- **Container Constraints**: `--restart`, `--log-opt`, and resource limits $\\rightarrow$ corresponding Compose service attributes.

## 2. Why someone uses it
Manual conversion of long `docker run` strings is error-prone and tedious, especially when dealing with production-grade containers featuring dozens of flags.

### Key Drivers:
- **Infrastructure as Code (IaC)**: Transitioning from "imperative" container starts (running a command) to "declarative" orchestration (managing a file).
- **Version Control**: `docker-compose.yml` files can be committed to Git, enabling peer review and historical tracking of environment changes.
- **Complexity Management**: Managing multi-container environments becomes impossible with raw CLI commands; Compose allows defining dependencies (`depends_on`) and shared networks.
- **Standardization**: Ensures that every team member deploys the exact same container configuration across different environments (dev, staging, prod).

## 3. Step-by-Step Instructions

### Basic Conversion
1. **Input**: Paste your complete `docker run` command into the input field.
2. **Instant Translation**: The tool reactively generates the YAML output in real-time.
3. **Validation**: Check the alert sections below the output for:
    - **Non-translatable options**: Flags that have no direct equivalent in Compose.
    - **Unimplemented features**: New Docker CLI flags that the parser hasn't yet mapped.
    - **Conversion errors**: Syntax errors in the provided CLI string.
4. **Deployment**: Copy the YAML output or use the **"Download docker-compose.yml"** button to save the file directly.

### Advanced Workflow
1. **Drafting**: Use the tool to generate the base `docker-compose.yml`.
2. **Refining**: Manually add advanced Compose features that cannot be captured from a single `run` command, such as `healthcheck`, `deploy` replicas, or `profiles`.
3. **Execution**: Run `docker compose up -d` in the directory containing the generated file.

## 4. Examples

### Simple Web Server
**Input:**
```bash
docker run -p 80:80 -d nginx
```
**Output:**
```yaml
services:
  nginx:
    image: nginx
    ports:
      - "80:80"
```

### Complex Application Stack
**Input:**
```bash
docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g --name my-app -e NODE_ENV=production nginx
```
**Output:**
```yaml
services:
  my-app:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
    restart: always
    logging:
      driver: json-file
      options:
        max-size: 1g
    environment:
      - NODE_ENV=production
```

## 5. FAQs
**Q: Does the tool handle custom network aliases?**
A: Yes, the converter parses `--network-alias` and `--network` flags to populate the `networks` section of the Compose file.

**Q: What happens if I use a flag that doesn't exist in Docker Compose?**
A: The tool will identify the flag and display an informational alert stating that the specific option is "not translatable." The rest of the command will still be converted.

**Q: Is the generated YAML compliant with the latest Compose Specification?**
A: Yes, it uses `composerize-ts` to ensure the output follows the modern Compose schema, removing the need for legacy version tags (like `version: '3.8'`) in newer Docker versions.

## 6. Common Mistakes
- **Relative Paths**: Forgetting that `-v ./data:/app/data` in a CLI command requires the `docker-compose.yml` to be located in the same directory as the `./data` folder.
- **Shell Variable Expansion**: Pasting a command containing shell variables (e.g., `-e PASSWORD=$MY_PASS`). The converter treats these as literal strings; you must manually change them to `${MY_PASS}` in the YAML for Compose to interpolate them from the `.env` file.
- **Ordering**: Placing flags after the image name in the `docker run` command. While Docker allows some arguments after the image, some parsers may struggle—always ensure flags come before the image name for maximum compatibility.

## 7. Use Cases (Professional/Industrial)

### Legacy System Migration
A sysadmin inherits a legacy project where the only documentation is a `deploy.sh` script containing various `docker run` commands. They use this tool to convert those scripts into a `docker-compose.yml` to enable modern orchestration and easier scaling.

### Dev-to-Prod Alignment
A developer runs a complex container locally using a long CLI string to test a specific volume mount and port configuration. To ensure the DevOps team replicates this exactly in the staging environment, the developer converts the command to Compose and submits it as part of a Pull Request.

### CI/CD Pipeline Refactoring
A Jenkins pipeline uses `sh 'docker run ...'` to spin up a temporary database for integration tests. The team converts this to a Compose file to use `docker compose up` and `down`, allowing them to define a more stable network bridge for multiple test containers.

## 8. Related Tools
- **Docker Compose**: The primary orchestration tool used to execute the generated YAML.
- **Docker Inspect**: Useful for extracting the current configuration of a *running* container to feed into the converter.
- **YQ**: A portable command-line YAML processor for programmatically editing the generated `docker-compose.yml`.
- **Envfile**: Used alongside Compose to manage the `-e` variables converted by this tool.
