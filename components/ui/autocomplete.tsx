import React, { KeyboardEventHandler, useState } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface AutocompleteProps extends InputProps {
  suggestions: string[];
  onSuggestionSelected: (suggestion: string) => void;
}

export const Autocomplete = React.forwardRef<
  HTMLInputElement,
  AutocompleteProps
>(({ suggestions, onSuggestionSelected, ...props }, ref) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.code === 'Enter') {
      // Enter key
      e.preventDefault();
      setShowSuggestions(false);
      setActiveSuggestionIndex(0);

      if (filteredSuggestions[activeSuggestionIndex]) {
        onSuggestionSelected(filteredSuggestions[activeSuggestionIndex]);
      } else {
        onSuggestionSelected((e.target as HTMLInputElement).value || '');
      }
    } else if (e.code === 'ArrowUp') {
      // Up arrow
      if (activeSuggestionIndex === 0) return;
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.code === 'ArrowDown') {
      // Down arrow
      if (activeSuggestionIndex === filteredSuggestions.length - 1) return;
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    } else if (e.code === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const filtered = suggestions.filter(
      (suggestion) =>
        userInput &&
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    if (props.onChange) {
      props.onChange(e);
    } else {
      setInputValue(userInput);
    }

    setFilteredSuggestions(filtered);
    setShowSuggestions(!!filtered?.length && true);
    setActiveSuggestionIndex(0);
  };

  const handleSuggestionSelected = (suggestion: string) => {
    setFilteredSuggestions([]);
    onSuggestionSelected(suggestion);
    setShowSuggestions(false);

    setInputValue(suggestion);
  };

  return (
    <>
      <Input
        autoComplete="off"
        ref={ref}
        type="text"
        value={inputValue}
        {...props}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <SuggestionsListComponent
          activeSuggestionIndex={activeSuggestionIndex}
          suggestions={filteredSuggestions}
          onSuggestionsSelected={handleSuggestionSelected}
        />
      )}
    </>
  );
});

Autocomplete.displayName = 'Autocomplete';

const SuggestionsListComponent = ({
  suggestions,
  activeSuggestionIndex = 0,
  onSuggestionsSelected,
}: {
  suggestions: string[];
  activeSuggestionIndex: number;
  onSuggestionsSelected: (suggestion: string) => void;
}) => {
  return suggestions.length ? (
    <div className="relative w-full">
      <ul
        className="shadow-md border w-full bg-white mt-1 border-t-0 absolute
      max-h-52 overflow-auto z-10 rounded-b-md"
      >
        {suggestions.map((suggestion, index) => {
          return (
            <li
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSuggestionsSelected(suggestion);
              }}
              className={cn('pt-2 pb-2 pl-3 pr-3 cursor-pointer', {
                'bg-slate-300': index === activeSuggestionIndex,
              })}
              key={suggestion}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="no-suggestions">
      <em>No suggestions available</em>
    </div>
  );
};
