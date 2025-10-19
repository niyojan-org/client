'use client';
import { Input } from "./input";

export default function FloatingInput({ label, type = 'text', name = '', value: propValue, onChange, ...props }) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className="block text-sm text-muted-foreground font-inter "
      >
        {label}
      </label>
      <Input
        type={type}
        name={name}
        id={name}
        value={propValue}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}