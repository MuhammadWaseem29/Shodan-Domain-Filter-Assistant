document.addEventListener('DOMContentLoaded', () => {
  const baseQueryInput = document.getElementById('base-query');
  const domainsInput = document.getElementById('domains');
  const generateBtn = document.getElementById('generate-btn');
  const status = document.getElementById('status');
  const themeToggle = document.getElementById('theme-toggle');

  // Load the last used base query from localStorage
  chrome.storage.local.get('lastBaseQuery', (data) => {
    if (data.lastBaseQuery) {
      baseQueryInput.value = data.lastBaseQuery;
    }
  });

  // Load theme preference
  chrome.storage.local.get('theme', (data) => {
    if (data.theme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    }
  });

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
  });

  generateBtn.addEventListener('click', () => {
    const baseQuery = baseQueryInput.value.trim();
    const domainsText = domainsInput.value.trim();

    // Basic validation
    if (!baseQuery) {
      status.textContent = 'Please enter a base Shodan query.';
      return;
    }
    if (!domainsText) {
      status.textContent = 'Please enter at least one target domain.';
      return;
    }

    // Save the base query to localStorage
    chrome.storage.local.set({ lastBaseQuery: baseQuery });

    // Split domains into an array and filter out empty lines
    const domains = domainsText.split('\n').map(d => d.trim()).filter(d => d);

    // Validate domains
    const invalidDomains = domains.filter(d => !/^[a-zA-Z0-9-.*]+$/.test(d));
    if (invalidDomains.length > 0) {
      status.textContent = `Invalid domains detected: ${invalidDomains.join(', ')}`;
      return;
    }

    status.textContent = 'Generating queries and opening tabs...';

    // Generate and open Shodan queries with a delay
    domains.forEach((domain, index) => {
      setTimeout(() => {
        const query = `${baseQuery} hostname:${domain}`;
        const encodedQuery = encodeURIComponent(query);
        const url = `https://www.shodan.io/search?query=${encodedQuery}`;
        chrome.tabs.create({ url, active: false });
        if (index === domains.length - 1) {
          status.textContent = 'All tabs opened successfully!';
        }
      }, index * 1500); // 1.5-second delay between each tab
    });
  });
});