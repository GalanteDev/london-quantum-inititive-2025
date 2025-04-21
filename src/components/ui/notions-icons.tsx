// Common styles for all icons
const IconBase = ({ className = "", children }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>{children}</div>
  )
  
  // External Link icon
  export function ExternalLink({ className = "" }) {
    return (
      <IconBase className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </IconBase>
    )
  }
  
  // Graduation Cap icon
  export function GraduationCap({ className = "" }) {
    return (
      <IconBase className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      </IconBase>
    )
  }
  
  // Building icon
  export function Building({ className = "" }) {
    return (
      <IconBase className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="22" x2="9" y2="2" />
          <line x1="15" y1="22" x2="15" y2="2" />
          <line x1="4" y1="12" x2="9" y2="12" />
          <line x1="15" y1="12" x2="20" y2="12" />
        </svg>
      </IconBase>
    )
  }
  
  // Users icon
  export function Users({ className = "" }) {
    return (
      <IconBase className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </IconBase>
    )
  }
  
  // Book Open icon
  export function BookOpen({ className = "" }) {
    return (
      <IconBase className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </IconBase>
    )
  }
  
  // Chevron Right icon
  export function ChevronRight({ className = "" }) {
    return (
      <IconBase className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </IconBase>
    )
  }
  