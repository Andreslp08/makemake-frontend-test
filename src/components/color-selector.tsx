import { Icon } from "@iconify/react";
import { mapRange } from "gsap/all";
import React, { useEffect, useState } from "react";
import ColorCardShape from "../assets/images/backBoton.png";

const COLORS = {
	none: {
		key: "none",
		color: "#ffff",
	},
	red: {
		key: "red",
		color: "#f54343",
	},
	orange: {
		key: "orange",
		color: "#ff9100",
	},
	yellow: {
		key: "yellow",
		color: "#FFD100",
	},
	green: {
		key: "green",
		color: "#99D438",
	},
	blue: {
		key: "blue",
		color: "#0077ff",
	},
	purple: {
		key: "purple",
		color: "#6666CC",
	},
};

interface ColorSelectorProps {
	onSelect?(color: string): void;
	defaultColor?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ defaultColor, onSelect }) => {
	const [selectedColor, setSelectedColor] = useState<string>(defaultColor || COLORS.none.color);

	const handleSelection = (color: string) => {
		setSelectedColor(color);
		if (onSelect) onSelect(color);
	};

    useEffect(()=>{
        setSelectedColor(defaultColor || COLORS.none.color);
    },[defaultColor])

	return (
		<div className="color-selector">
			{Object.values(COLORS).map((colorItem, i) => {
				return (
					<ColorCard
						key={i}
						colorKey={colorItem.key}
						color={colorItem.color}
						onSelect={handleSelection}
						selected={
							selectedColor == colorItem.color
								? true
								: false
						}
					/>
				);
			})}
		</div>
	);
};

interface ColorCardProps {
	colorKey: string;
	color: string;
	selected?: boolean;
	onSelect?(color: string): void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, colorKey, selected, onSelect }) => {
	return (
		<div
			className={`color-card-${colorKey} ${selected && "selected"}`}
			onClick={() => onSelect && onSelect(color)}
		>
			<img className="shape" src={ColorCardShape} alt="color-card-shape" />
			<Icon icon={"bi:check-square-fill"} className="icon" />
		</div>
	);
};
