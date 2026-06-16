# IPv6 ULA Generator: Secure Private Networking for the Modern Internet

In the world of IPv6, Unique Local Addresses (ULAs) serve a similar purpose to private IPv4 addresses (like `192.168.x.x`). They allow for local network communication without requiring a globally routable prefix from an ISP. However, unlike IPv4 private ranges, ULAs are designed to be globally unique to avoid address collisions when two private networks are merged.

Using a standardized method to generate these addresses ensures that your internal infrastructure remains consistent and conflict-free, which is vital for enterprise labs, home automation, and container orchestration.

## 1. What the Tool Does
The IPv6 ULA Generator creates a random `/48` IPv6 prefix based on the IETF RFC 4193 specification. It uses a provided MAC address and the current timestamp, processed through a SHA-1 hash, to generate the Global ID. This ensures the resulting address has a very high probability of being globally unique while remaining within the `fd00::/8` non-routable range.

## 2. Why Professionals Use It
- **Collision Avoidance:** Ensures that if two companies or departments merge their internal networks, their IPv6 addresses won't conflict.
- **Stability:** Provides a permanent local address for internal services that won't change even if the external ISP-provided prefix does.
- **Security:** Simplifies internal firewall configurations by using a dedicated local range that is never routed to the public internet.
- **Compliance:** Follows RFC 4193 standards for generating "locally assigned" Global IDs.

## 3. Step-by-Step Instructions
1. Provide a **MAC address** (the tool often provides a default or you can use your own).
2. The tool automatically combines this with the current timestamp.
3. Observe the generated **IPv6 ULA prefix** (typically starting with `fd`).
4. Copy the `/48` prefix for your router configuration.
5. Use the provided **First routable block** and **Last routable block** (`/64`) to plan your specific subnets.

## 4. Examples
- **Input MAC:** `00:1A:2B:3C:4D:5E`
  - **Output ULA:** `fdXX:XXXX:XXXX::/48`
  - **First Subnet:** `fdXX:XXXX:XXXX:0000::/64`
- **Scenario:** An engineer setting up a Proxmox cluster wants to ensure internal management traffic stays local. They generate a ULA to assign static IPs to their nodes.

## 5. FAQs
**Q: Can I access the internet with a ULA address?**
A: No, ULA addresses are intentionally non-routable on the public internet. They are for internal network communication only.

**Q: Why do I need to provide a MAC address?**
A: The MAC address acts as a unique seed for the hash function, significantly reducing the chance that another user will generate the same ULA prefix.

## 6. Common Mistakes
- **Using a simple prefix like `fd00::1`:** This violates the randomness requirement of RFC 4193 and leads to collisions. Always use a generated random Global ID.
- **Forgetting the "L" bit:** ULAs in the `fd00::/8` range must have the "L" bit set to 1, which this tool handles automatically.

## 7. Real-World Use Cases
- **Enterprise Intranets:** Assigning stable addresses to internal file servers and databases.
- **IoT Networks:** Providing unique identifiers for hundreds of smart devices without exposing them to the internet.
- **Site-to-Site VPNs:** Connecting two remote offices without worrying about overlapping private IP ranges.

## 8. Related Tools
- **MAC Address Generator:** Generate a random MAC address to use as a seed for this tool.
- **IPv4 Subnet Calculator:** For managing legacy private network segments.

---
Future-proof your local network with unique IPv6 identifiers.
