# chmod-calculator

The `chmod-calculator` is a high-precision utility designed to translate complex Unix-style file system permissions into their exact octal and symbolic representations. It eliminates the manual mental arithmetic required to determine the correct numeric mode for `chmod` operations, ensuring precise access control management.

## 1. What the Tool Does
The tool provides a visual matrix for mapping three primary permission scopes (**Read**, **Write**, **Execute**) across three user categories (**Owner**, **Group**, and **Public/Others**). 

As users toggle permissions, the tool dynamically calculates:
- **Octal Representation**: The three-digit numeric mode (e.g., `755`) used in standard `chmod` commands.
- **Symbolic Representation**: The human-readable string (e.g., `rwxr-xr-x`) representing the permission bitmask.
- **Command Generation**: An immediate, copy-pasteable CLI command tailored for the current configuration.

## 2. Why Someone Uses It
System administrators and developers often struggle with the "bitmask math" of Unix permissions, especially when dealing with restrictive environments or auditing existing security postures. This tool is used to:
- **Prevent Security Leaks**: Avoid the "chmod 777" trap by allowing the user to visualize exactly which bits are being set.
- **Audit Permissions**: Quickly verify what a specific octal code actually allows in terms of real-world access.
- **Accelerate Workflow**: Rapidly generate correct `chmod` commands without referring to manual tables.

## 3. Step-by-Step Instructions
1. **Define Owner Permissions**: Use the **Owner (u)** column to specify what the file creator can do. (Typically `Read` and `Write` are checked).
2. **Define Group Permissions**: Use the **Group (g)** column to set permissions for users in the file's assigned group.
3. **Define Public Permissions**: Use the **Public (o)** column to set the "World" permissions.
4. **Verify Result**: Observe the dynamic update of the octal value (e.g., `644`) and the symbolic string (e.g., `rw-r--r--`).
5. **Apply Change**: Copy the generated `chmod [octal] path` command from the input field and execute it in your terminal.

## 4. Examples

### Standard Web Asset (Read-only for others)
- **Owner**: Read + Write (`4+2=6`)
- **Group**: Read (`4`)
- **Public**: Read (`4`)
- **Result**: `644` $\\rightarrow$ `chmod 644 index.html`

### Executable Script (Full access for owner, execute for others)
- **Owner**: Read + Write + Execute (`4+2+1=7`)
- **Group**: Read + Execute (`4+1=5`)
- **Public**: Read + Execute (`4+1=5`)
- **Result**: `755` $\\rightarrow$ `chmod 755 deploy.sh`

### Private Key/Sensitive Config (Strictly Owner)
- **Owner**: Read + Write (`4+2=6`)
- **Group**: None (`0`)
- **Public**: None (`0`)
- **Result**: `600` $\\rightarrow$ `chmod 600 id_rsa`

## 5. FAQs
**Q: Why is "Execute" important for directories?**
A: In Unix, the "Execute" bit on a directory is required to "enter" the directory (i.e., to `cd` into it) or access files within it. Without it, you cannot access the contents even if you have Read permissions.

**Q: Does this tool handle SUID, SGID, or the Sticky Bit?**
A: This calculator focuses on the standard 3-bit permission set (rwx). Special bits (the 4th leading digit in octal) are not handled by the visual matrix but are critical for advanced system-level binaries.

**Q: What is the difference between Symbolic and Octal?**
A: Octal is a shorthand numeric representation based on base-8 math. Symbolic is a direct representation of the bits (`r` for read, `w` for write, `x` for execute, and `-` for null).

## 6. Common Mistakes
- **The "777" Reflex**: Applying `777` (world-writable) to fix a permission error. This is a critical security vulnerability. Always use the calculator to find the *minimum* necessary permissions.
- **Missing Directory Execute Bit**: Setting a directory to `644` (rw-r--r--). This makes the directory un-enterable for everyone. Directories almost always need the execute bit (`755` or `700`).
- **Confusing Group and Public**: Accidentally granting a sensitive permission to the "Public" column when it should have been restricted to the "Group" column.

## 7. Use Cases (Professional/Industrial)
- **CI/CD Pipeline Configuration**: Defining precise permissions for build artifacts and binaries in `.gitlab-ci.yml` or GitHub Actions to ensure the deployment user has execution rights but not modification rights.
- **Hardening SSH Keys**: Ensuring `.ssh/authorized_keys` and private keys are set to `600` to prevent the SSH daemon from rejecting the keys due to "too open" permissions.
- **Web Server Deployment**: Setting `/var/www/html` directories to `755` and files to `644` to allow Nginx/Apache to read content while preventing public users from modifying the source code.

## 8. Related Tools
- **`stat`**: The CLI command used to check the current octal/symbolic permissions of a file.
- **`umask`**: The system-level tool that defines the *default* permissions for newly created files.
- **`getfacl` / `setfacl`**: Tools for Access Control Lists (ACLs) when standard `chmod` (UGO) is too coarse-grained for complex enterprise requirements.
