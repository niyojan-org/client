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

  const renderRequired = () =>
    required ? <span className="text-destructive-foreground">*</span> : null;

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
            {label} {renderRequired()}
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
            {label} {renderRequired()}
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
            {label} {renderRequired()}
          </Label>
          <Select
            value={value || ""}
            onValueChange={(val) => onChange(name, val)}
            className="grid grid-cols-1 w-full"
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

    // RadioGroup and Checkbox grids updated for responsiveness
case "radio":
  return (
    <div className="space-y-1">
      <Label>
        {label} {renderRequired()}
      </Label>
      <RadioGroup
        value={value || ""}
        onValueChange={(val) => onChange(name, val)}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2 w-[48%] sm:w-auto">
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
        {label} {renderRequired()}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2 w-[48%] sm:w-auto">
            <Checkbox
              id={`${name}-${opt.value}`}
              checked={Array.isArray(value) ? value.includes(opt.value) : false}
              onCheckedChange={(checked) => {
                const newValue = Array.isArray(value) ? [...value] : [];
                if (checked) newValue.push(opt.value);
                else newValue.splice(newValue.indexOf(opt.value), 1);
                onChange(name, newValue);
              }}
            />
            <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );


    // case "file":
    //   return (
    //     <div className="space-y-1">
    //       <Label htmlFor={name}>
    //         {label} {renderRequired()}
    //       </Label>
    //       <Input
    //         id={name}
    //         name={name}
    //         type="file"
    //         required={required}
    //         onChange={(e) => onChange(name, e.target.files?.[0] || null)}
    //       />
    //     </div>
    //   );

    default:
      return null;
  }
}
