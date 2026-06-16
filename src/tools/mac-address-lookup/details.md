# MAC Address Lookup

## What it does
The MAC Address Lookup tool allows you to identify the manufacturer or vendor of a network device based on its Media Access Control (MAC) address. By analyzing the first three octets (the OUI), the tool searches a comprehensive database to return the organization's name and details.

## Why professionals use it
- **Network Troubleshooting:** Identifying unknown devices on a network to determine if they are legitimate hardware (e.g., finding out that a mysterious device is actually an HP printer).
- **Security Auditing:** Detecting potential rogue devices or unauthorized hardware connected to a corporate network.
- **Inventory Management:** Verifying hardware details during infrastructure audits or asset tracking.
- **Protocol Analysis:** Understanding the source of network packets during packet sniffing or traffic analysis.

## Instructions
1. **Enter MAC Address:** Type or paste the MAC address into the input field. The tool supports various formats (e.g., `20:37:06:12:34:56`, `20-37-06-12-34-56`, or `203706123456`).
2. **View Results:** The "Vendor info" card will automatically update with the manufacturer's name and address information if found in the database.
3. **Copy Info:** If a vendor is found, click the **Copy vendor info** button to save the details to your clipboard.

## Examples
- **Cisco:** `00:00:0C` -> Cisco Systems, Inc.
- **Apple:** `00:03:93` -> Apple, Inc.
- **Google:** `3C:5A:B4` -> Google, Inc.
- **Microsoft:** `00:03:FF` -> Microsoft Corporation

## FAQs
- **What is an OUI?** OUI stands for Organizationally Unique Identifier. It is the first 24 bits (3 bytes) of a MAC address that uniquely identifies a vendor or manufacturer.
- **Why is my MAC address showing as "Unknown"?** This usually happens if the OUI is very new and not yet in the database, if it's a "locally administered" address (often used in virtualization), or if it's a randomized address used for privacy.
- **Does this tool store the MAC addresses I search?** No, all lookups are performed locally in your browser for maximum privacy and security.

## Common Mistakes
- **Typos:** Accidentally entering an incorrect character (e.g., 'O' instead of '0' or 'I' instead of '1').
- **Invalid Format:** Including characters that are not part of the hexadecimal set (0-9, A-F) or common separators.
- **Short Addresses:** Entering fewer than 6 characters (the minimum required to identify the OUI).

## Use Cases
- **Wi-Fi Monitoring:** Checking the manufacturer of devices connected to your home or office router.
- **IoT Discovery:** Identifying the brand of smart home devices that appear on your network with cryptic names.
- **Forensics:** Investigating the origin of hardware involved in security incidents.

## Related Tools
- **MAC Address Generator:** Create random MAC addresses for testing or simulation.
- **IPv4 Subnet Calculator:** Analyze network ranges and CIDR blocks.
- **User Agent Parser:** Identify browser and OS details from a user agent string.
