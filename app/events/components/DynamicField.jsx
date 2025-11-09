"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-number-input";
import { min } from "date-fns";

export default function DynamicField({ field, value, onChange }) {
  const {
    name,
    label,
    type,
    required,
    placeholder,
    min,
    max,
    options = [],
  } = field;

  const Req = required ? <span className="text-red-500">*</span> : null;

  // -------- Inputs --------
  if (["text", "email", "url", "date"].includes(type)) {
    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="font-medium">
          {label} {Req}
        </Label>
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || ""}
          required={required}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className="rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
    );
  }

  if (type === "number") {
    {
      // console.log(type);
    }
    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="font-medium">
          {label} {Req}
        </Label>
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          required={required}
          value={value || ""}
          min={min}
          max={max}
          onChange={(e) => onChange(name, e.target.value)}
          className="rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
    );
  }

  if (type === "tel") {
    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="font-medium">
          {label} {Req}
        </Label>
        <PhoneInput
          id={name}
          name={name}
          placeholder={placeholder || "123-456-7890"}
          required={required}
          value={value || ""}
          onChange={(val) => onChange(name, val)}
          className="rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
          defaultCountry="IN"
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="font-medium">
          {label} {Req}
        </Label>
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder || ""}
          required={required}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className="rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary min-h-[1px]"
        />
      </div>
    );
  }

  if (type === "dropdown") {
    return (
      <div className="space-y-2">
        <Label className="font-medium">
          {label} {Req}
        </Label>
        <Select
          value={value || ""}
          onValueChange={(val) => onChange(name, val)}
        >
          <SelectTrigger className="rounded-lg shadow-sm">
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="space-y-2">
        <Label className="font-medium">
          {label} {Req}
        </Label>
        <RadioGroup
          value={value || ""}
          onValueChange={(val) => onChange(name, val)}
          className="flex flex-wrap gap-3"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm hover:border-primary/50 cursor-pointer"
            >
              <RadioGroupItem
                id={`${name}-${opt.value}`}
                value={opt.value}
                className="border-primary text-primary"
              />
              <Label
                htmlFor={`${name}-${opt.value}`}
                className="cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="space-y-2">
        <Label className="font-medium">
          {label} {Req}
        </Label>
        <div className="flex flex-wrap gap-3">
          {options.map((opt) => {
            const checked = Array.isArray(value) && value.includes(opt.value);
            return (
              <div
                key={opt.value}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm hover:border-primary/50"
              >
                <Checkbox
                  id={`${name}-${opt.value}`}
                  checked={checked}
                  onCheckedChange={(c) => {
                    let newVal = Array.isArray(value) ? [...value] : [];
                    if (c) newVal.push(opt.value);
                    else newVal = newVal.filter((v) => v !== opt.value);
                    onChange(name, newVal);
                  }}
                />
                <Label
                  htmlFor={`${name}-${opt.value}`}
                  className="cursor-pointer"
                >
                  {opt.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
