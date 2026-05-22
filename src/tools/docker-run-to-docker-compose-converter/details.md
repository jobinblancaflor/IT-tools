# Docker Run to Docker Compose Converter

## 1. What the tool does
The Docker Run to Docker Compose Converter is a specialized utility designed to translate single-line `docker run` commands into structured, multi-line Docker Compose YAML files. It serves as a bridge between the imperative world of quick CLI commands and the declarative world of infrastructure-as-code (IaC). 

By parsing the various flags, arguments, and parameters of a `docker run` command—such as port mappings, volume mounts, environment variables, network configurations, and restart policies—the tool automatically generates a syntactically correct `docker-compose.yml` equivalent. It utilizes the `composerize-ts` library to handle the heavy lifting of parsing complex shell arguments and mapping them to the appropriate Compose specification fields.

## 2. Why someone uses it
Modern container orchestration favors declarative configuration over imperative execution. While `docker run` is excellent for testing a quick image or running a one-off container, it becomes unmanageable as systems grow in complexity. 

Developers and DevOps engineers use this tool for several reasons:
- **Transitioning to Production:** Moving from a "quick start" command to a maintainable configuration file.
- **Documentation:** A `docker-compose.yml` file acts as living documentation of how a service should be run, which is far easier to read and share than a long, opaque shell command.
- **Consistency:** Ensuring that the same environment can be spun up across different machines (dev, staging, prod) without relying on shell history or copy-pasted snippets.
- **Reducing Error Rates:** Manually translating dozens of flags like `--cap-add`, `--sysctl`, or complex volume mappings into YAML is error-prone. This tool automates the mapping to prevent typos and indentation mistakes.
- **Learning Tool:** For those new to Docker Compose, seeing the direct translation of a familiar `docker run` command is an excellent way to learn the Compose syntax.

## 3. Step-by-step instructions
Using the tool is straightforward, but requires attention to the input command's structure:

1.  **Prepare your command:** Locate the `docker run` command you wish to convert. Ensure it is a valid command that would execute in a standard terminal.
2.  **Input:** Paste the entire command into the "Your docker run command" text area. The tool typically handles multi-line commands (using `\`) but works best with single-line strings.
3.  **Automatic Conversion:** As you type or paste, the tool reactively processes the input. The resulting YAML will appear in the output section below the divider.
4.  **Review Messages:** Pay close attention to any alerts that appear:
    - **Info (Not Translatable):** These are options that don't have a direct equivalent in the Docker Compose specification (e.g., certain interactive terminal flags like `-it`).
    - **Warning (Not Implemented):** These are flags that `composerize-ts` recognizes but has not yet mapped to a Compose field.
    - **Error:** If the command is malformed or unparseable, an error message will provide feedback.
5.  **Copy or Download:** Use the "Copy" button to grab the YAML for your clipboard, or click "Download docker-compose.yml" to save the file directly to your local machine.

## 4. Examples

### Basic Web Server
**Input:**
```bash
docker run -d --name web-server -p 8080:80 nginx:latest
```

**Output:**
```yaml
version: '3.3'
services:
    nginx:
        container_name: web-server
        ports:
            - '8080:80'
        image: 'nginx:latest'
```

### Complex Database Configuration
**Input:**
```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -v pgdata:/var/lib/postgresql/data --network my-net --restart unless-stopped postgres:14-alpine
```

**Output:**
```yaml
version: '3.3'
services:
    postgres:
        environment:
            - POSTGRES_PASSWORD=mysecretpassword
        volumes:
            - 'pgdata:/var/lib/postgresql/data'
        networks:
            - my-net
        restart: unless-stopped
        image: 'postgres:14-alpine'
```

## 5. FAQs

**Q: Does it support all Docker version features?**
A: It supports the most common features used in standard deployments. However, bleeding-edge features or specific plugins might not be implemented in the underlying `composerize-ts` parser yet.

**Q: Can it handle multiple containers at once?**
A: The tool is designed to convert a single `docker run` command into a service block. If you have multiple commands, you will need to convert them individually and manually merge the service blocks into one `docker-compose.yml` file.

**Q: Why are some flags missing in the output?**
A: Flags like `-i`, `-t`, or `--rm` are often excluded because they are designed for ephemeral CLI interactions rather than persistent service orchestration.

**Q: Is my sensitive data (passwords in `-e`) safe?**
A: Yes. The conversion happens entirely in your browser. No data is sent to a server for processing.

## 6. Common mistakes
- **Malformed Shell Commands:** Pasting a command that isn't a valid `docker run` (e.g., missing the image name or having unclosed quotes) will cause the parser to fail.
- **Copying Prefixes:** Including sudo or other shell wrappers sometimes confuses the parser if they are not formatted correctly.
- **Ignoring Warnings:** If the tool says a flag is "not implemented," you must manually add that configuration to the YAML if it's critical for your container.
- **Version Compatibility:** The tool defaults to a specific Compose version (usually 3.3). If your environment requires a specific version features (like GPU support which varies between 2.x and 3.x), you may need to adjust the `version` tag manually.

## 7. Use cases
- **Legacy System Migration:** An engineer finds an old `run.sh` script with a 20-line `docker run` command and needs to modernize it for a CI/CD pipeline.
- **Documentation for Open Source:** A project maintainer wants to provide a Compose file alongside their existing `docker run` instructions to lower the barrier for new users.
- **Stack Overflow / Tutorials:** Quickly converting snippets found online to test them in a local development stack.
- **DevOps Prototyping:** Rapidly testing different flag combinations in the CLI and then "freezing" the successful result into a configuration file.

## 9. Technical Deep Dive: From Imperative to Declarative
The conversion process from `docker run` to Docker Compose is more than a simple string replacement; it involves a sophisticated parsing of shell arguments. When you paste a command, the tool first tokensize the string to identify the executable (`docker`), the subcommand (`run`), and the subsequent flags and arguments.

### The Parsing Challenge
Docker's CLI uses a variety of flag formats: single-dash short flags (`-p`), double-dash long flags (`--publish`), and boolean flags that don't take values (`-d`). Furthermore, some flags can be specified multiple times (like `-v` or `-e`), which must be aggregated into a list or dictionary in the YAML output. The `composerize-ts` engine must also handle shell-specific nuances, such as quoted strings containing spaces or environment variables that include equals signs.

### Mapping Logic
Once the flags are extracted, the tool maps them to the Docker Compose Specification (V3). For instance:
- `--restart` maps directly to the `restart` key.
- `-p 80:80` is parsed into a list under the `ports` key.
- `-v /host:/container` is analyzed to determine if it's a bind mount or a named volume. If it starts with a `/` or `.`, it's treated as a bind mount; otherwise, it's categorized as a volume that might need a top-level `volumes` declaration.

### Handling Unmapped Flags
One of the most complex aspects of the converter is dealing with flags that have no direct Compose equivalent or are context-dependent. Flags like `--rm` (remove container on exit) are logically incompatible with the persistent nature of `docker-compose up`. Similarly, `--link` is technically deprecated in favor of user-defined networks, but the converter must still decide how to represent it to maintain functional parity with the original command.

## 10. Best Practices for Generated Files
While the tool provides a high-quality starting point, professional workflows often require a few manual finishing touches:
1.  **Version Management:** The tool outputs a generic version header. Depending on your Docker Engine version, you might want to specify `version: '3.8'` to unlock features like `deploy` configurations or advanced secret management.
2.  **Network Isolation:** By default, the tool will place everything in a default network. For production, you should manually define front-end and back-end networks to restrict traffic flow between containers.
3.  **Volume Definitions:** If the tool detects named volumes, remember to define them in the top-level `volumes:` block at the end of your file to ensure they are created correctly by the Compose engine.
4.  **Environment Files:** For security, instead of keeping API keys in the `environment:` block (as converted from `-e`), consider moving them to an `.env` file and using the `env_file:` key in your Compose YAML.
