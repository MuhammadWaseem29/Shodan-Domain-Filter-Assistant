Shodan Domain Filter Assistant
A Chrome extension designed for bug bounty hunters to refine Shodan queries by appending domain filters and opening results in new tabs.
Features

Base Query Input: Enter a Shodan query (e.g., cpe:"cpe:2.3:o:paloaltonetworks:pan-os").
Domain List Input: Add target domains (one per line, e.g., nasa.gov, *.tesla.com).
Generate & Open: Creates filtered queries and opens each in a new tab with a 1.5-second delay.
Persistence: Stores the last used base query in localStorage.
Validation: Ensures valid domain inputs.
Dark/Light Mode: Toggle between themes with persistent storage.

Installation

Clone or download this repository.
Open Chrome and navigate to chrome://extensions/.
Enable Developer mode in the top-right corner.
Click Load unpacked and select the folder containing the extension files.
The extension should now appear in your toolbar.

Usage

Click the extension icon to open the popup.
Enter a base Shodan query in the first input field.
List target domains in the second field (one per line).
Click Generate Queries & Open Tabs.
Filtered Shodan search tabs will open automatically.
Toggle between dark and light modes using the theme button in the header.

Example

Base Query: cpe:"cpe:2.3:o:paloaltonetworks:pan-os"
Domains:nasa.gov
sony.com
*.tesla.com


Output Tabs:
https://www.shodan.io/search?query=cpe%3A%22cpe%3A2.3%3Ao%3Apaloaltonetworks%3Apan-os%22+hostname%3Anasa.gov
https://www.shodan.io/search?query=cpe%3A%22cpe%3A2.3%3Ao%3Apaloaltonetworks%3Apan-os%22+hostname%3Asony.com
https://www.shodan.io/search?query=cpe%3A%22cpe%3A2.3%3Ao%3Apaloaltonetworks%3Apan-os%22+hostname%3A*.tesla.com



Notes

Fully client-side; no external dependencies or API calls.
Tested with Chrome Manifest V3.
Version: 1.2 (includes UI enhancements and theme toggle).

