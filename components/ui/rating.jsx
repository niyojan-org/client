"use client";;
import * as React from "react";
import { useComposedRefs } from "@/lib/compose-refs";
import { cn } from "@/lib/utils";
import { VisuallyHiddenInput } from "@/components/visually-hidden-input";
import { IconStar } from "@tabler/icons-react";

const Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...slotProps,
      ...children.props,
      ref: forwardedRef,
      style: {
        ...slotProps.style,
        ...children.props.style,
      },
      className: cn(slotProps.className, children.props.className),
    });
  }
  
  return null;
});
Slot.displayName = "Slot";

const ROOT_NAME = "Rating";
const ITEM_NAME = "RatingItem";

const ENTRY_FOCUS = "ratingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

function getItemId(id, value) {
  return `${id}-item-${value}`;
}

function getPartialFillGradientId(id, step) {
  return `partial-fill-gradient-${id}-${step}`;
}

const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  Home: "first",
  End: "last",
};

function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft"
    ? "ArrowRight"
    : key === "ArrowRight"
      ? "ArrowLeft"
      : key;
}

function getFocusIntent(
  event,
  dir,
  orientation,
) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key))
    return undefined;
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key))
    return undefined;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}

function focusFirst(
  candidates,
  preventScroll = false,
) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidateRef of candidates) {
    const candidate = candidateRef.current;
    if (!candidate) continue;
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}

function useLazyRef(fn) {
  const ref = React.useRef(null);

  if (ref.current === null) {
    ref.current = fn();
  }

  return ref;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const DirectionContext = React.createContext(undefined);

function useDirection(dirProp) {
  const contextDir = React.useContext(DirectionContext);
  return dirProp ?? contextDir ?? "ltr";
}

function createStore(listenersRef, stateRef, onValueChange, onHover) {
  const store = {
    subscribe: (cb) => {
      if (listenersRef.current) {
        listenersRef.current.add(cb);
        return () => listenersRef.current?.delete(cb);
      }
      return () => {};
    },
    getState: () =>
      stateRef.current ?? {
        value: 0,
        hoveredValue: null,
      },
    setState: (key, value) => {
      const state = stateRef.current;
      if (!state || Object.is(state[key], value)) return;

      if (key === "value" && typeof value === "number") {
        state.value = value;
        onValueChange?.(value);
      } else if (key === "hoveredValue") {
        state.hoveredValue = value;
        onHover?.(value);
      } else {
        state[key] = value;
      }

      store.notify();
    },
    notify: () => {
      if (listenersRef.current) {
        for (const cb of listenersRef.current) {
          cb();
        }
      }
    },
  };

  return store;
}

const StoreContext = React.createContext(null);

function useStoreContext(consumerName) {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

function useStore(selector) {
  const store = useStoreContext("useStore");

  const getSnapshot = React.useCallback(() => selector(store.getState()), [store, selector]);

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

const RatingContext = React.createContext(null);

function useRatingContext(consumerName) {
  const context = React.useContext(RatingContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

const FocusContext = React.createContext(null);

function useFocusContext(consumerName) {
  const context = React.useContext(FocusContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`FocusProvider\``);
  }
  return context;
}

function RatingRoot(props) {
  const {
    value,
    defaultValue = 0,
    onValueChange,
    onHover,
    ...rootProps
  } = props;

  const stateRef = useLazyRef(() => ({
    value: value ?? defaultValue,
    hoveredValue: null,
  }));
  const listenersRef = useLazyRef(() => new Set());

  const store = React.useMemo(
    () => createStore(listenersRef, stateRef, onValueChange, onHover),
    [listenersRef, stateRef, onValueChange, onHover]
  );

  return (
    <StoreContext.Provider value={store}>
      <RatingRootImpl {...rootProps} value={value} />
    </StoreContext.Provider>
  );
}

function RatingRootImpl(props) {
  const {
    value,
    id: idProp,
    dir: dirProp,
    orientation = "horizontal",
    activationMode = "automatic",
    size = "default",
    max = 5,
    step = 1,
    clearable = false,
    ,
    disabled = false,
    readOnly = false,
    required = false,
    name,
    className,
    ref,
    ...rootProps
  } = props;

  const store = useStoreContext("RatingRootImpl");

  useIsomorphicLayoutEffect(() => {
    if (value !== undefined) {
      store.setState("value", value);
    }
  }, [value]);

  const dir = useDirection(dirProp);
  const id = React.useId();
  const rootId = idProp ?? id;
  const currentValue = useStore((state) => state.value);

  const [formTrigger, setFormTrigger] = React.useState(null);
  const composedRef = useComposedRefs(ref, (node) => setFormTrigger(node));

  const isFormControl = formTrigger ? !!formTrigger.closest("form") : true;

  const [tabStopId, setTabStopId] = React.useState(null);
  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
  const [focusableItemCount, setFocusableItemCount] = React.useState(0);
  const isClickFocusRef = React.useRef(false);
  const itemsRef = React.useRef(new Map());

  const autoIndexMapRef = React.useRef(new Map());
  const nextAutoIndexRef = React.useRef(0);

  const getAutoIndex = React.useCallback((instanceId) => {
    const existingIndex = autoIndexMapRef.current.get(instanceId);
    if (existingIndex !== undefined) {
      return existingIndex;
    }

    const newIndex = nextAutoIndexRef.current++;
    autoIndexMapRef.current.set(instanceId, newIndex);
    return newIndex;
  }, []);

  const onItemFocus = React.useCallback((tabStopId) => {
    setTabStopId(tabStopId);
  }, []);

  const onItemShiftTab = React.useCallback(() => {
    setIsTabbingBackOut(true);
  }, []);

  const onFocusableItemAdd = React.useCallback(() => {
    setFocusableItemCount((prevCount) => prevCount + 1);
  }, []);

  const onFocusableItemRemove = React.useCallback(() => {
    setFocusableItemCount((prevCount) => prevCount - 1);
  }, []);

  const onItemRegister = React.useCallback((item) => {
    itemsRef.current.set(item.id, item);
  }, []);

  const onItemUnregister = React.useCallback((id) => {
    itemsRef.current.delete(id);
  }, []);

  const getItems = React.useCallback(() => {
    return Array.from(itemsRef.current.values())
      .filter((item) => item.ref.current)
      .sort((a, b) => {
        const elementA = a.ref.current;
        const elementB = b.ref.current;
        if (!elementA || !elementB) return 0;
        const position = elementA.compareDocumentPosition(elementB);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        }
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        }
        return 0;
      });
  }, []);

  const onBlur = React.useCallback((event) => {
    rootProps.onBlur?.(event);
    if (event.defaultPrevented) return;

    setIsTabbingBackOut(false);
  }, [rootProps.onBlur]);

  const onFocus = React.useCallback((event) => {
    rootProps.onFocus?.(event);
    if (event.defaultPrevented) return;

    const isKeyboardFocus = !isClickFocusRef.current;
    if (
      event.target === event.currentTarget &&
      isKeyboardFocus &&
      !isTabbingBackOut
    ) {
      const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
      event.currentTarget.dispatchEvent(entryFocusEvent);

      if (!entryFocusEvent.defaultPrevented) {
        const items = Array.from(itemsRef.current.values()).filter((item) => !item.disabled);
        const selectedItem = items.find((item) => item.value === currentValue);
        const currentItem = items.find((item) => item.id === tabStopId);

        const candidateItems = [selectedItem, currentItem, ...items].filter(Boolean);
        const candidateRefs = candidateItems.map((item) => item.ref);
        focusFirst(candidateRefs, false);
      }
    }
    isClickFocusRef.current = false;
  }, [rootProps.onFocus, isTabbingBackOut, currentValue, tabStopId]);

  const onMouseDown = React.useCallback((event) => {
    rootProps.onMouseDown?.(event);

    if (event.defaultPrevented) return;

    isClickFocusRef.current = true;
  }, [rootProps.onMouseDown]);

  const contextValue = React.useMemo(() => ({
    id: rootId,
    dir,
    orientation,
    activationMode,
    disabled,
    readOnly,
    size,
    getAutoIndex,
    max,
    step,
    clearable,
  }), [
    rootId,
    dir,
    orientation,
    activationMode,
    disabled,
    readOnly,
    size,
    getAutoIndex,
    max,
    step,
    clearable,
  ]);

  const focusContextValue = React.useMemo(() => ({
    tabStopId,
    onItemFocus,
    onItemShiftTab,
    onFocusableItemAdd,
    onFocusableItemRemove,
    onItemRegister,
    onItemUnregister,
    getItems,
  }), [
    tabStopId,
    onItemFocus,
    onItemShiftTab,
    onFocusableItemAdd,
    onFocusableItemRemove,
    onItemRegister,
    onItemUnregister,
    getItems,
  ]);

  const RootPrimitive =  ? Slot : "div";

  return (
    <RatingContext.Provider value={contextValue}>
      <FocusContext.Provider value={focusContextValue}>
        <RootPrimitive
          id={rootId}
          role="radiogroup"
          aria-orientation={orientation}
          data-disabled={disabled ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          data-orientation={orientation}
          data-slot="rating"
          dir={dir}
          tabIndex={isTabbingBackOut || focusableItemCount === 0 ? -1 : 0}
          {...rootProps}
          ref={composedRef}
          className={cn("flex gap-1 text-primary outline-none", orientation === "horizontal"
            ? "flex-row items-center"
            : "flex-col items-start", className)}
          onBlur={onBlur}
          onFocus={onFocus}
          onMouseDown={onMouseDown} />
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id={getPartialFillGradientId(rootId, step)}>
              {dir === "rtl" ? (
                <>
                  <stop offset="50%" stopColor="transparent" />
                  <stop offset="50%" stopColor="currentColor" />
                </>
              ) : (
                <>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </>
              )}
            </linearGradient>
          </defs>
        </svg>
        {isFormControl && (
          <VisuallyHiddenInput
            type="hidden"
            control={formTrigger}
            name={name}
            value={currentValue}
            disabled={disabled}
            readOnly={readOnly}
            required={required} />
        )}
      </FocusContext.Provider>
    </RatingContext.Provider>
  );
}

function RatingItem(props) {
  const { index, , disabled, className, ref, children, ...itemProps } =
    props;

  const itemRef = React.useRef(null);
  const composedRef = useComposedRefs(ref, itemRef);

  const context = useRatingContext(ITEM_NAME);

  const instanceId = React.useId();

  const actualIndex = React.useMemo(() => {
    if (index !== undefined) {
      return index;
    }

    return context.getAutoIndex(instanceId);
  }, [index, context, instanceId]);

  const itemValue = actualIndex + 1;
  const store = useStoreContext(ITEM_NAME);
  const focusContext = useFocusContext(ITEM_NAME);
  const value = useStore((state) => state.value);
  const hoveredValue = useStore((state) => state.hoveredValue);
  const clearable = context.clearable;
  const step = context.step;
  const activationMode = context.activationMode;

  const itemId = getItemId(context.id, itemValue);
  const isDisabled = context.disabled || disabled;
  const isReadOnly = context.readOnly;
  const isTabStop = focusContext.tabStopId === itemId;

  const displayValue = hoveredValue ?? value;
  const isFilled = displayValue >= itemValue;
  const isPartiallyFilled =
    step < 1 && displayValue >= itemValue - step && displayValue < itemValue;
  const isHovered = hoveredValue !== null && hoveredValue < itemValue;

  const isMouseClickRef = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    focusContext.onItemRegister({
      id: itemId,
      ref: itemRef,
      value: itemValue,
      disabled: !!isDisabled,
    });

    if (!isDisabled) {
      focusContext.onFocusableItemAdd();
    }

    return () => {
      focusContext.onItemUnregister(itemId);
      if (!isDisabled) {
        focusContext.onFocusableItemRemove();
      }
    };
  }, [focusContext, itemId, itemValue, isDisabled]);

  const onClick = React.useCallback((event) => {
    itemProps.onClick?.(event);
    if (event.defaultPrevented) return;

    if (!isDisabled && !isReadOnly) {
      let newValue = itemValue;

      if (step < 1) {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const isLeftHalf = clickX < rect.width / 2;

        if (context.dir === "rtl") {
          if (!isLeftHalf) {
            newValue = itemValue - step;
          }
        } else {
          if (isLeftHalf) {
            newValue = itemValue - step;
          }
        }
      }

      if (clearable && value === newValue) {
        newValue = 0;
      }

      store.setState("value", newValue);
    }
  }, [
    isDisabled,
    isReadOnly,
    clearable,
    step,
    value,
    itemValue,
    store,
    context.dir,
    itemProps.onClick,
  ]);

  const onMouseEnter = React.useCallback((event) => {
    itemProps.onMouseEnter?.(event);
    if (event.defaultPrevented) return;

    if (!isDisabled && !isReadOnly) {
      let hoverValue = itemValue;

      if (step < 1) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const isLeftHalf = mouseX < rect.width / 2;

        if (context.dir === "rtl") {
          if (!isLeftHalf) {
            hoverValue = itemValue - step;
          }
        } else {
          if (isLeftHalf) {
            hoverValue = itemValue - step;
          }
        }
      }

      store.setState("hoveredValue", hoverValue);
    }
  }, [
    isDisabled,
    isReadOnly,
    step,
    itemValue,
    store,
    context.dir,
    itemProps.onMouseEnter,
  ]);

  const onMouseMove = React.useCallback((event) => {
    itemProps.onMouseMove?.(event);
    if (event.defaultPrevented) return;

    if (!isDisabled && !isReadOnly && step < 1) {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const isLeftHalf = mouseX < rect.width / 2;

      let hoverValue = itemValue;
      if (context.dir === "rtl") {
        hoverValue = !isLeftHalf ? itemValue - step : itemValue;
      } else {
        hoverValue = isLeftHalf ? itemValue - step : itemValue;
      }

      store.setState("hoveredValue", hoverValue);
    }
  }, [
    isDisabled,
    isReadOnly,
    step,
    itemValue,
    store,
    context.dir,
    itemProps.onMouseMove,
  ]);

  const onMouseLeave = React.useCallback((event) => {
    itemProps.onMouseLeave?.(event);
    if (event.defaultPrevented) return;

    if (!isDisabled && !isReadOnly) {
      store.setState("hoveredValue", null);
    }
  }, [isDisabled, isReadOnly, store, itemProps.onMouseLeave]);

  const onFocus = React.useCallback((event) => {
    itemProps.onFocus?.(event);
    if (event.defaultPrevented) return;

    focusContext.onItemFocus(itemId);

    const isKeyboardFocus = !isMouseClickRef.current;

    if (
      !isDisabled &&
      !isReadOnly &&
      activationMode !== "manual" &&
      isKeyboardFocus
    ) {
      const newValue = clearable && value === itemValue ? 0 : itemValue;
      store.setState("value", newValue);
    }

    isMouseClickRef.current = false;
  }, [
    focusContext,
    itemId,
    activationMode,
    isDisabled,
    isReadOnly,
    clearable,
    value,
    itemValue,
    store,
    itemProps.onFocus,
  ]);

  const onKeyDown = React.useCallback((event) => {
    itemProps.onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (
      (event.key === "Enter" || event.key === " ") &&
      activationMode === "manual"
    ) {
      event.preventDefault();
      if (!isDisabled && !isReadOnly && itemRef.current) {
        itemRef.current.click();
      }
      return;
    }

    if (event.key === "Tab" && event.shiftKey) {
      focusContext.onItemShiftTab();
      return;
    }

    if (event.target !== event.currentTarget) return;

    const focusIntent = getFocusIntent(event, context.dir, context.orientation);

    if (focusIntent !== undefined) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return;
      event.preventDefault();

      const items = focusContext.getItems().filter((item) => !item.disabled);
      let candidateRefs = items.map((item) => item.ref);

      if (focusIntent === "last") {
        candidateRefs.reverse();
      } else if (focusIntent === "prev" || focusIntent === "next") {
        if (focusIntent === "prev") candidateRefs.reverse();
        const currentIndex = candidateRefs.findIndex((ref) => ref.current === event.currentTarget);
        candidateRefs = candidateRefs.slice(currentIndex + 1);
      }

      queueMicrotask(() => focusFirst(candidateRefs));
    }
  }, [
    focusContext,
    context.dir,
    context.orientation,
    activationMode,
    isDisabled,
    isReadOnly,
    itemProps.onKeyDown,
  ]);

  const onMouseDown = React.useCallback((event) => {
    itemProps.onMouseDown?.(event);
    if (event.defaultPrevented) return;

    isMouseClickRef.current = true;

    if (isDisabled) {
      event.preventDefault();
    } else {
      focusContext.onItemFocus(itemId);
    }
  }, [focusContext, itemId, isDisabled, itemProps.onMouseDown]);

  const dataState = isFilled
    ? "full"
    : isPartiallyFilled
      ? "partial"
      : "empty";

  const ItemPrimitive =  ? Slot : "button";

  return (
    <ItemPrimitive
      id={itemId}
      role="radio"
      type="button"
      aria-checked={isFilled}
      aria-posinset={itemValue}
      aria-setsize={context.max}
      data-disabled={isDisabled ? "" : undefined}
      data-readonly={isReadOnly ? "" : undefined}
      data-state={isFilled ? "full" : isPartiallyFilled ? "partial" : "empty"}
      data-hovered={isHovered ? "" : undefined}
      data-slot="rating-item"
      disabled={isDisabled}
      tabIndex={isTabStop ? 0 : -1}
      {...itemProps}
      ref={composedRef}
      style={{
        ...itemProps.style,
        ...(isPartiallyFilled && {
          "--partial-fill": `url(#${getPartialFillGradientId(context.id, step)})`,
        }),
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "[&_svg:not([class*='size-'])]:size-full [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-colors [&_svg]:duration-200 data-[state=empty]:[&_svg]:fill-transparent data-[state=full]:[&_svg]:fill-current data-[state=partial]:[&_svg]:fill-[var(--partial-fill)]",
        context.size === "sm"
          ? "size-4"
          : context.size === "lg"
            ? "size-6"
            : "size-5",
        className
      )}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}>
      {typeof children === "function"
        ? children(dataState)
        : (children ?? <IconStar />)}
    </ItemPrimitive>
  );
}

export {
  RatingRoot as Root,
  RatingItem as Item,
  //
  RatingRoot as Rating,
  RatingItem,
  //
  useStore as useRating,
};
