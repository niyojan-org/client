"use client";

function MfaMethodSelector({ methods = [], activeMethod, onMethodChange }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/80 p-2 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {methods.map((method) => {
          const isActive = method.id === activeMethod;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onMethodChange(method.id)}
              className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
              aria-pressed={isActive}
            >
              <p className="text-sm font-semibold">{method.label}</p>
              <p className="text-xs text-muted-foreground">
                {method.helperText}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MfaMethodSelector;
