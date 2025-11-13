// Array of event objects for dynamic generation
const events = [
    {
        id: 1,
        title: "Keynote: The AI Revolution",
        speaker: "Dr. Evelyn Reed",
        time: "9:00 AM - 10:00 AM",
        location: "Grand Ballroom",
        description: "An in-depth look at current AI trends and their societal impact on the tech landscape."
    },
    {
        id: 2,
        title: "Workshop: Advanced React Hooks",
        speaker: "Alex Johnson",
        time: "10:30 AM - 12:00 PM",
        location: "Room C-201 (Development Track)",
        description: "Mastering custom hooks for state management, performance, and side effects in enterprise applications."
    },
    {
        id: 3,
        title: "Panel: Future of Web3",
        speaker: "Various Experts",
        time: "1:00 PM - 2:30 PM",
        location: "Grand Ballroom",
        description: "A lively discussion on blockchain infrastructure, NFTs, and the path to decentralized applications."
    },
    {
        id: 4,
        title: "Breakout: Cybersecurity Threats",
        speaker: "Mia Chen",
        time: "2:45 PM - 4:15 PM",
        location: "Room C-205 (Security Track)",
        description: "Learning the latest defense strategies and zero-trust architectures against evolving cyber attacks."
    },
    {
        id: 5,
        title: "Networking Mixer",
        speaker: "All Attendees",
        time: "4:30 PM - 6:00 PM",
        location: "Conference Lobby",
        description: "An informal session to connect with speakers, sponsors, and peers over refreshments."
    },
    {
        id: 6,
        title: "Closing Thoughts: 2026 Roadmap",
        speaker: "TechCon Committee",
        time: "6:15 PM - 7:00 PM",
        location: "Grand Ballroom",
        description: "A look ahead at next year's themes and opportunities for collaboration."
    },
];

const bannerThemes = [
    'bg-banner-theme-1', // Indigo
    'bg-banner-theme-2', // Emerald
    'bg-banner-theme-3', // Pink
];
let currentBannerIndex = 0;


/**
 * Creates the HTML string for a single event card using Tailwind classes.
 * Includes dark mode variants for text and background colors.
 * @param {object} event - The event data object.
 * @returns {string} The full HTML string for the card.
 */
function createEventCard(event) {
    return `
        <div class="event-card bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700
                    transition duration-300 ease-in-out 
                    hover:shadow-2xl hover:scale-[1.02] hover:border-primary dark:hover:border-dark-primary">
            
            <h3 class="text-xl font-bold mb-3 text-primary dark:text-dark-primary border-b border-accent pb-2">
                ${event.title}
            </h3>

            <div class="space-y-2 text-sm">
                <p><strong class="font-semibold text-gray-600 dark:text-gray-300">Speaker:</strong> <span class="dark:text-white">${event.speaker}</span></p>
                <p><strong class="font-semibold text-gray-600 dark:text-gray-300">Time:</strong> <span class="text-accent font-medium">${event.time}</span></p>
                <p><strong class="font-semibold text-gray-600 dark:text-gray-300">Location:</strong> <span class="dark:text-white">${event.location}</span></p>
                <p class="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 italic">
                    ${event.description}
                </p>
            </div>

            <button onclick="alert('Viewing details for: ${event.title}')"
                class="mt-6 w-full py-2.5 rounded-lg text-white font-semibold 
                        bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-4 
                        focus:ring-indigo-300 dark:bg-dark-primary dark:hover:bg-indigo-600 
                        dark:focus:ring-indigo-500 transition duration-150 shadow-md">
                View Details
            </button>
        </div>
    `;
}

/* --- Dark Mode Toggle Logic --- */
function toggleDarkMode(isInitial = false) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleIconMobile = document.getElementById('toggle-icon-mobile');

    const isDark = body.classList.contains('dark');
    
    if (isDark) {
        // Switch to Light Mode
        body.classList.remove('dark', 'bg-dark-bg', 'text-gray-100');
        body.classList.add('bg-white', 'text-gray-800');
        if (!isInitial) localStorage.setItem('theme', 'light');

        if (toggleIcon) toggleIcon.textContent = '🌙';
        if (themeToggle) themeToggle.lastChild.textContent = ' Dark Mode';
        if (toggleIconMobile) toggleIconMobile.textContent = '🌙';
        if (themeToggleMobile) themeToggleMobile.lastChild.textContent = ' Dark Mode';
    } else {
        // Switch to Dark Mode
        body.classList.add('dark', 'bg-dark-bg', 'text-gray-100');
        body.classList.remove('bg-white', 'text-gray-800');
        if (!isInitial) localStorage.setItem('theme', 'dark');

        if (toggleIcon) toggleIcon.textContent = '☀️';
        if (themeToggle) themeToggle.lastChild.textContent = ' Light Mode';
        if (toggleIconMobile) toggleIconMobile.textContent = '☀️';
        if (themeToggleMobile) themeToggleMobile.lastChild.textContent = ' Light Mode';
    }
}

/**
 * Cycles the header's background class to simulate changing the banner image/theme.
 */
function changeBannerTheme() {
    const header = document.getElementById('site-header');
    
    // Remove all existing banner theme classes (bg-banner-theme-X and bg-primary/dark-bg)
    header.classList.remove('bg-primary', 'dark:bg-dark-bg', ...bannerThemes);
    
    // Increment index and loop back if necessary
    currentBannerIndex = (currentBannerIndex + 1) % bannerThemes.length;
    
    // Get the new class
    const newThemeClass = bannerThemes[currentBannerIndex];
    
    // Apply the new class
    header.classList.add(newThemeClass);
}


document.addEventListener('DOMContentLoaded', () => {
    const eventContainer = document.getElementById('event-container');
    const themeToggleDesktop = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const bannerChangeDesktop = document.getElementById('banner-change-button');
    const bannerChangeMobile = document.getElementById('banner-change-button-mobile');

    // --- 1. Load Dark Mode Preference ---
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        toggleDarkMode(true);
    } else {
        toggleDarkMode(true); // Initialize in light mode
    }

    // --- 2. Attach Event Handlers ---
    if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', () => toggleDarkMode(false));
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', () => toggleDarkMode(false));
    
    if (bannerChangeDesktop) bannerChangeDesktop.addEventListener('click', changeBannerTheme);
    if (bannerChangeMobile) bannerChangeMobile.addEventListener('click', changeBannerTheme);


    // --- 3. Generate Cards ---
    if (eventContainer) {
        events.forEach(event => {
            const cardHTML = createEventCard(event);
            eventContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
});