'use client';

export default function FloatingInput({ label, type = 'text', name = '', value: propValue, onChange, ...props }) {
  return (
    <div className="relative w-full space-y-2">
      <label
        htmlFor={name}
        className="block text-sm text-muted-foreground font-inter px-4"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={propValue}
        onChange={onChange}
        className="w-full text-sm sm:text-base border border-border bg-background text-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
        {...props}
      />
    </div>
  );
}