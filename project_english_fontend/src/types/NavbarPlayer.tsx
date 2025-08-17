interface NavbarPlayerProps {
    duration: number; // Total duration of the audio
    currentTime: number; // Current time of the audio
    volume: number; // Current volume (0 to 1)
    progressPercentage: number; // Progress of the audio as a percentage
    onRewind: () => void; // Function to rewind 5 seconds
    onPlayPause: () => void; // Function to toggle play/pause
    onForward: () => void; // Function to forward 5 seconds
    onVolumeChange: (value: number[]) => void; // Function to handle volume change
    formatTime: (time: number) => string; // Function to format time
    isPlaying:boolean
}