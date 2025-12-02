'use client';

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function SelectQuestion({
    question,
    value,
    onChange,
    options = [],
    required = false,
    placeholder = 'Please Select',
    className = '',
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <Label className="text-base font-medium text-foreground">
                {question}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <Select value={value} onValueChange={onChange} required={required}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
