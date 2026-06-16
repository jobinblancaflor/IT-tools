# WiFi QR Code Generator

## What it does
The WiFi QR Code Generator allows you to create a scannable QR code that enables users to connect to a WiFi network instantly without manually entering the network name (SSID) or password. It supports various encryption types including WPA/WPA2, WEP, and WPA2-EAP (Enterprise), and allows for visual customization of the QR code colors.

## Why someone uses it
- **Convenience:** Allows guests or customers to connect to your WiFi by simply scanning a code with their phone's camera.
- **Accuracy:** Eliminates errors caused by mistyping complex passwords or network names.
- **Professionalism:** Provides a polished way to share network access in offices, cafes, or homes.
- **Enterprise Support:** Supports WPA2-EAP, making it useful for corporate environments with individual user identities.

## Step-by-step instructions
1. **Choose Encryption:** Select the encryption method used by your network (**No password**, **WPA/WPA2**, **WEP**, or **WPA2-EAP**).
2. **Enter SSID:** Type the exact name of your WiFi network in the **SSID** field.
3. **Hidden SSID:** If your network does not broadcast its name, check the **Hidden SSID** box.
4. **Enter Password:** For encrypted networks, enter the WiFi password.
5. **WPA2-EAP Details (Enterprise Only):**
   - Select the **EAP method** (e.g., PEAP, TTLS).
   - Enter the **Identity** and choose if it should be **Anonymous**.
   - Select the **EAP Phase 2 method**.
6. **Customize Colors:** Use the color pickers to change the **Foreground** (dots) and **Background** colors of the QR code.
7. **Preview and Download:** The QR code updates in real-time. Once satisfied, click **Download qr-code** to save it as a PNG image.

## Examples
- **Home WiFi:** WPA/WPA2, SSID: "Home_Network", Password: "mypassword123".
- **Public Cafe:** No password, SSID: "Cafe_Free_WiFi".
- **Office Enterprise:** WPA2-EAP, SSID: "Office_Corp", EAP Method: PEAP, Identity: "user@example.com".

## FAQs
- **Is my password sent to a server?** No. The QR code is generated locally in your browser. Your WiFi credentials never leave your device.
- **Which phones can scan this?** Most modern smartphones (iPhone/iOS and Android) can scan WiFi QR codes directly through the native camera app.
- **Can I use any color?** Yes, but ensure there is high contrast between the foreground and background colors so that cameras can successfully scan the code.

## Common mistakes
- **Incorrect SSID:** Entering the SSID incorrectly (it is case-sensitive).
- **Low Contrast:** Choosing colors that are too similar, making the QR code unreadable for scanners.
- **Wrong Encryption:** Selecting WPA when the network actually uses WEP or WPA2-EAP.

## Use cases
- **Home Guests:** Printed QR code on a fridge or guest room desk.
- **Business/Hospitality:** Table tents in restaurants or cafes for easy customer access.
- **Office Meetings:** Posted in conference rooms for quick attendee connection.
- **Airbnbs:** Providing a seamless experience for short-term renters.

## Related tools
- **QR Code Generator:** For generating QR codes for URLs, text, or other data types.
- **Token Generator:** For creating strong, secure passwords for your WiFi network.
- **Password Strength Analyser:** To ensure your WiFi password is secure enough.
