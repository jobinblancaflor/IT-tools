# MAC Address Generator

## What it does
The MAC Address Generator is a tool designed to create random Media Access Control (MAC) addresses. It allows users to generate single or multiple MAC addresses with customizable options such as specific prefixes, case formatting (uppercase or lowercase), and various separators (colon, hyphen, dot, or none).

## Why professionals use it
- **Network Simulation:** Network engineers use it to generate addresses for virtual machines, containers, or simulated network devices.
- **Testing:** Developers use it to test applications that process or store MAC addresses, ensuring their software handles various formats and duplicates correctly.
- **Privacy:** Generating random MAC addresses can be used for spoofing to enhance privacy when connecting to public networks (though this tool is for generation, not the act of spoofing).
- **Automation:** Quickly generating a list of unique identifiers for hardware-linked software licensing or inventory management systems.

## Instructions
1. **Quantity:** Enter the number of MAC addresses you want to generate (between 1 and 100).
2. **MAC address prefix:** (Optional) Enter a specific prefix (OUI - Organizationally Unique Identifier) if you want the addresses to belong to a specific manufacturer. For example, `64:16:7F`.
3. **Case:** Choose between **Uppercase** (e.g., `00:1A:2B...`) or **Lowercase** (e.g., `00:1a:2b...`).
4. **Separator:** Select the character used to separate the octets: colon `:`, hyphen `-`, dot `.`, or `None` for no separator.
5. **View/Refresh:** The generated addresses appear in the card below. Click **Refresh** to generate a new set with the same settings.
6. **Copy:** Click the **Copy** button to save the list to your clipboard.

## Examples
- **Standard Format:** `64:16:7F:A1:B2:C3` (Uppercase, Colon separator)
- **Windows Style:** `64-16-7F-A1-B2-C3` (Uppercase, Hyphen separator)
- **Cisco Style:** `6416.7fa1.b2c3` (Generated as `64.16.7F.A1.B2.C3` in this tool, though Cisco often uses 4-digit groups)
- **No Separator:** `64167FA1B2C3`

## FAQs
- **Are these MAC addresses real?** No, they are randomly generated. While they follow the correct format, they may or may not belong to a real manufacturer unless you provide a specific prefix.
- **What is a MAC address prefix?** The first three octets (e.g., `00:11:22`) are known as the Organizationally Unique Identifier (OUI), which identifies the manufacturer of the network interface.
- **Can I generate addresses for a specific brand?** Yes, by looking up the OUI for that brand (e.g., Apple, Intel, Cisco) and entering it in the prefix field.

## Common Mistakes
- **Invalid Prefix:** Entering non-hexadecimal characters (other than separators) in the prefix field.
- **Length Confusion:** Entering a prefix longer than 6 octets, which would result in an invalid MAC address length.

## Use Cases
- **VLAN Configuration:** Populating test environments with mock devices to verify VLAN tagging and security policies.
- **DHCP Server Testing:** Generating unique MAC addresses to test DHCP pool exhaustion and IP assignment logic.
- **Database Seeding:** Filling a development database with realistic network device data.

## Related Tools
- **MAC Address Lookup:** Identify the manufacturer associated with a given MAC address.
- **IPv4 Subnet Calculator:** Plan and calculate IP address ranges for your network.
- **UUID Generator:** Create unique identifiers for other software development needs.
