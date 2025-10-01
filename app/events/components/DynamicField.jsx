import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function DynamicField({ field, value, onChange }) {
  const { name, label, type, required, placeholder, options = [] } = field;

  switch (type) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "url":
    case "date":
      return (
        <div className="space-y-1">
          <Label htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder || ""}
            required={required}
            value={value || ""}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-1">
          <Label htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder || ""}
            required={required}
            value={value || ""}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>
      );

    case "dropdown":
      return (
        <div className="space-y-1">
          <Label>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Select
            value={value || ""}
            onValueChange={(val) => onChange(name, val)}
          >
            <SelectTrigger>
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

    case "radio":
      return (
        <div className="space-y-1">
          <Label>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <RadioGroup
            value={value || ""}
            onValueChange={(val) => onChange(name, val)}
            className={"grid-cols-5"}
          >
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-1">
          <Label>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <div className="grid grid-cols-5">
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${name}-${opt.value}`}
                  checked={
                    Array.isArray(value) ? value.includes(opt.value) : false
                  }
                  onCheckedChange={(checked) => {
                    let newValue = Array.isArray(value) ? [...value] : [];
                    if (checked) newValue.push(opt.value);
                    else newValue = newValue.filter((v) => v !== opt.value);
                    onChange(name, newValue);
                  }}
                />
                <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
              </div>
            ))}
          </div>
        </div>
      );

    case "file":
      return (
        <div className="space-y-1">
          <Label htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={name}
            name={name}
            type="file"
            required={required}
            onChange={(e) => onChange(name, e.target.files?.[0] || null)}
          />
        </div>
      );

    default:
      return null;
  }
}
