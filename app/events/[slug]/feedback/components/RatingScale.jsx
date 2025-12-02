'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function RatingScale({
    question,
    value,
    onChange,
    required = false,
    min = 1,
    max = 10,
    minLabel,
    maxLabel
}) {
    const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
        <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">
                {question}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <div className="space-y-2">
                <div className="flex gap-2 justify-between">
                    {scale.map((num) => (
                        <button
                            key={num}
                            type="button"
                            onClick={() => onChange(num)}
                            className={cn(
                                "w-12 h-12 rounded-full border-2 transition-all duration-200 font-medium",
                                "hover:border-primary hover:bg-primary/5",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                value === num
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-foreground"
                            )}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                {(minLabel || maxLabel) && (
                    <div className="flex justify-between text-sm text-muted-foreground px-1">
                        <span>{minLabel}</span>
                        <span>{maxLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
