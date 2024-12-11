import { useEffect, useRef } from "react";

import { Input, type InputProps } from "~/components/ui/input";

const PaneResizeInput = ({ value, ...rest }: InputProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!spanRef.current || !inputRef.current) return;

    inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
  }, [value]);

  return (
    <>
      <span
        className="invisible absolute h-0 whitespace-pre text-lg opacity-0"
        ref={spanRef}
      >
        {value}
      </span>
      <Input
        ref={inputRef}
        value={value}
        className="border-0 p-0 text-lg shadow-none ring-0 focus:border-0 focus-visible:ring-0"
        {...rest}
      />
    </>
  );
};

export { PaneResizeInput };
