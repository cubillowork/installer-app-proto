// iOS status bar (iPhone, 44pt): time on the left; signal, Wi-Fi and battery on the right.
export function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-bar__time">9:41</span>
      <span className="status-bar__icons">
        {/* Cellular signal */}
        <svg width="18" height="12" viewBox="0 0 18 12">
          <rect x="0" y="8" width="3" height="4" rx="0.8" fill="currentColor" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" fill="currentColor" />
        </svg>
        {/* Wi-Fi */}
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 11.6 10.4 9.1a3.4 3.4 0 0 0-4.8 0L8 11.6Z" fill="currentColor" />
          <path d="M3.5 7.1 4.8 8.4a4.5 4.5 0 0 1 6.4 0l1.3-1.3a6.4 6.4 0 0 0-9 0Z" fill="currentColor" />
          <path d="M.9 4.5l1.3 1.3a8.2 8.2 0 0 1 11.6 0l1.3-1.3a10 10 0 0 0-14.2 0Z" fill="currentColor" />
        </svg>
        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity="0.35" fill="none" />
          <rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor" />
          <path d="M24 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

// iOS home indicator safe area (Figma: "Home indicator - Safe area - iOS - iPhone X", 375×34, bar 134×5 at y 21).
export function SafeArea() {
  return (
    <div className="safe-area" aria-hidden="true">
      <span className="safe-area__bar" />
    </div>
  );
}
