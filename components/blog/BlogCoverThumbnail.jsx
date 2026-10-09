"use client";

export default function BlogCoverThumbnail({ post, className = "" }) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt={post.title}
        className={`blog-thumb-img ${className}`}
        loading="lazy"
        style={{ filter: "grayscale(100%) contrast(105%)" }}
      />
    );
  }

  // High-contrast, sleek monochrome artistic SVG placeholders
  if (post.id === "pos-system-dual-screen") {
    return (
      <div className={`blog-art-cover bg-pos ${className}`}>
        <svg viewBox="0 0 200 125" className="blog-art-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="posGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            <pattern id="posGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="200" height="125" fill="url(#posGrad)" />
          <rect width="200" height="125" fill="url(#posGrid)" />
          
          {/* Main POS Screen */}
          <rect x="25" y="22" width="90" height="65" rx="6" fill="#000000" stroke="#3f3f46" strokeWidth="1.5" />
          <rect x="31" y="28" width="78" height="10" rx="2" fill="#18181b" />
          <circle cx="37" cy="33" r="2" fill="#ffffff" />
          <rect x="43" y="31.5" width="28" height="3" rx="1.5" fill="#71717a" />
          <rect x="31" y="44" width="45" height="4" rx="2" fill="#ffffff" opacity="0.9" />
          <rect x="31" y="52" width="30" height="3" rx="1.5" fill="#71717a" />
          <rect x="31" y="59" width="38" height="3" rx="1.5" fill="#71717a" />
          <rect x="31" y="68" width="78" height="12" rx="3" fill="#27272a" stroke="#52525b" strokeWidth="1" />
          <rect x="52" y="72.5" width="36" height="3.5" rx="1.5" fill="#ffffff" />
          <rect x="62" y="87" width="16" height="14" fill="#27272a" />
          <rect x="48" y="101" width="44" height="4" rx="2" fill="#3f3f46" />

          {/* Customer Facing Screen (Dual-Screen) */}
          <rect x="122" y="32" width="56" height="48" rx="5" fill="#18181b" stroke="#52525b" strokeWidth="1.2" />
          <rect x="127" y="38" width="46" height="6" rx="2" fill="#27272a" />
          <rect x="131" y="40.5" width="20" height="2" fill="#a1a1aa" />
          <rect x="127" y="49" width="32" height="10" rx="2" fill="#09090b" stroke="#52525b" strokeWidth="0.8" />
          <text x="131" y="56.5" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">₱ 1,480</text>
          <rect x="127" y="64" width="46" height="8" rx="2" fill="#27272a" />
          <rect x="145" y="80" width="10" height="12" fill="#27272a" />
          <rect x="138" y="92" width="24" height="3" rx="1.5" fill="#3f3f46" />
        </svg>
      </div>
    );
  }

  if (post.id === "capstone-to-startup") {
    return (
      <div className={`blog-art-cover bg-startup ${className}`}>
        <svg viewBox="0 0 200 125" className="blog-art-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="startupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            <pattern id="dotPattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.08)" />
            </pattern>
          </defs>
          <rect width="200" height="125" fill="url(#startupGrad)" />
          <rect width="200" height="125" fill="url(#dotPattern)" />

          {/* Architecture Nodes & Circuit Flow */}
          <path d="M 30 62 L 70 62 L 100 35 L 140 35 M 70 62 L 100 90 L 140 90 M 140 35 L 170 62 L 140 90" 
                fill="none" stroke="#71717a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          
          {/* Node 1: Microservices */}
          <circle cx="30" cy="62" r="10" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
          <text x="24" y="65" fill="#ffffff" fontSize="8" fontFamily="monospace">API</text>

          {/* Center Hub: RabbitMQ / Docker */}
          <rect x="60" y="50" width="24" height="24" rx="5" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="66" y="56" width="12" height="12" rx="2" fill="#3f3f46" />

          {/* Top Node: DTI Business */}
          <circle cx="140" cy="35" r="12" fill="#18181b" stroke="#a1a1aa" strokeWidth="1.5" />
          <text x="131" y="38" fill="#ffffff" fontSize="7" fontFamily="monospace">DTI</text>

          {/* Bottom Node: Cloud DB */}
          <circle cx="140" cy="90" r="12" fill="#18181b" stroke="#a1a1aa" strokeWidth="1.5" />
          <text x="130" y="93" fill="#ffffff" fontSize="7" fontFamily="monospace">MVP</text>

          {/* Output Node: Startup Scale */}
          <circle cx="170" cy="62" r="11" fill="#27272a" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="168,57 176,62 168,67" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  if (post.id === "hardware-fps-tuning") {
    return (
      <div className={`blog-art-cover bg-hardware ${className}`}>
        <svg viewBox="0 0 200 125" className="blog-art-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hwGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
          </defs>
          <rect width="200" height="125" fill="url(#hwGrad)" />
          
          {/* High-FPS Grid Radar / GPU Die Pattern */}
          <circle cx="100" cy="62" r="46" fill="none" stroke="#27272a" strokeWidth="1" />
          <circle cx="100" cy="62" r="32" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="100" cy="62" r="18" fill="#000000" stroke="#71717a" strokeWidth="1.5" />

          {/* Rays */}
          <line x1="100" y1="12" x2="100" y2="112" stroke="#27272a" strokeWidth="0.8" />
          <line x1="50" y1="62" x2="150" y2="62" stroke="#27272a" strokeWidth="0.8" />

          {/* CPU / GPU Chipset Center */}
          <rect x="85" y="47" width="30" height="30" rx="4" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="91" y="53" width="18" height="18" rx="2" fill="#27272a" />
          <text x="94" y="65" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">FPS</text>

          {/* Speed meters */}
          <text x="28" y="32" fill="#71717a" fontSize="8" fontFamily="monospace">3200 MHz</text>
          <text x="135" y="32" fill="#ffffff" fontSize="8" fontFamily="monospace">+60 FPS</text>
          <text x="28" y="105" fill="#71717a" fontSize="8" fontFamily="monospace">MX-4 COLD</text>
          <text x="135" y="105" fill="#d4d4d8" fontSize="8" fontFamily="monospace">1660 SUPER</text>
        </svg>
      </div>
    );
  }

  // Post 4: Midnight Coding, Dark Mode UIs & Arctic Monkeys
  return (
    <div className={`blog-art-cover bg-lifestyle ${className}`}>
      <svg viewBox="0 0 200 125" className="blog-art-svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nightGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#050508" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
        </defs>
        <rect width="200" height="125" fill="url(#nightGrad)" />

        {/* Arctic Monkeys / Audio Waveform Minimalist Art */}
        <path d="M 20 62 Q 40 62 50 62 T 70 30 T 85 92 T 100 20 T 115 102 T 130 35 T 145 78 T 160 62 T 180 62"
              fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        
        {/* Subtle Crescent Moon & 2 AM indicator */}
        <path d="M 165 24 A 8 8 0 0 0 157 16 A 10 10 0 1 1 165 24 Z" fill="#e4e4e7" opacity="0.85" />
        <text x="24" y="30" fill="#71717a" fontSize="7.5" fontFamily="monospace" opacity="0.8">02:00 AM</text>
        <text x="24" y="105" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace">ARCTIC MONKEYS</text>
        <text x="136" y="105" fill="#ffffff" fontSize="7.5" fontFamily="monospace">DARK MODE</text>
      </svg>
    </div>
  );
}
