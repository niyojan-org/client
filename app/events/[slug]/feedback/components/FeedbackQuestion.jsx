'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function FeedbackQuestion({ 
  question, 
  value, 
  onChange, 
  required = false,
  type = 'textarea',
  placeholder = '',
  rows = 4
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium text-foreground">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="resize-none"
          rows={rows}
          required={required}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          required={required}
        />
      )}
    </div>
  );
}
