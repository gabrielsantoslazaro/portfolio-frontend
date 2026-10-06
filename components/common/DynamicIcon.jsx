import * as LucideIcons from "lucide-react";

export default function DynamicIcon({ name, className = "w-5 h-5", ...props }) {
  if (!name) return null;

  // Custom Social Icons or Aliases
  if (name.toLowerCase() === "facebook") {
    const FacebookIcon = LucideIcons.Facebook;
    if (FacebookIcon) {
      return <FacebookIcon className={className} {...props} />;
    }
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;

  return <IconComponent className={className} {...props} />;
}
