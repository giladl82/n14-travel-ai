'use client';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { InputProps } from './input';

type Option = Record<'value' | 'label', string>;

type MultiSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (option: Option[]) => void;
} & InputProps;

export const MultiSelect = forwardRef<
  HTMLInputElement | null,
  MultiSelectProps
>(({ options, selectedOptions, setSelectedOptions, id }: MultiSelectProps, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useImperativeHandle(ref, () => inputRef.current!, []);

  const handleUnselect = (option: Option) => {
    setSelectedOptions(
      selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          const newSelected = [...selectedOptions];
          newSelected.pop();
          setSelectedOptions(newSelected);
        }
      }
      // This is not a default behavior of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  };

  const selectableOptions =
    options?.filter(
      (option) =>
        !selectedOptions.find(
          (selectedOption) => selectedOption.value === option.value
        )
    ) ?? [];

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedOptions?.map((option) => {
            return (
              <Badge key={option.value} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            id={id}
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder=""
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectableOptions.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover 
            text-popover-foreground shadow-md outline-none animate-in max-h-36 overflow-y-auto">
              <CommandGroup className="h-full overflow-auto">
                {selectableOptions?.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        setSelectedOptions([...selectedOptions, option]);
                      }}
                      className={'cursor-pointer'}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
});

MultiSelect.displayName = 'MultiSelect';
