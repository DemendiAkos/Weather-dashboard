import React from 'react'


interface SearchBarProps {
    onCityChange: (city: string) => void;

}

function SearchBar({ onCityChange }: SearchBarProps) {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onCityChange(event.currentTarget.value);
        }
    };

    return (
        <div>
            <label className="relative block">
                <span className="sr-only">Search</span>
                <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search for anything..."
                    type="text"
                    onKeyPress={handleKeyPress} 
                />
            
            </label>
        </div>
    );
}

    export default SearchBar