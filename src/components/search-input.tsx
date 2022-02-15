import React from "react";
import {ReactComponent as SearchIcon} from '../assets/svg/icons/lupa.svg';

interface SearchInputProps {
    className?:string;
	placeholder?: string;
	onValueChange?(value: string): void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onValueChange, className }) => {
	return (
		<div className="search-input">
			<input 
                className={`text-field ${className}`}
				type="text"
				onChange={(e) => onValueChange && onValueChange(e.currentTarget.value)}
				placeholder={placeholder}
			/>
            <SearchIcon className="search-icon" />
		</div>
	);
};
