import React, { useEffect, useState } from "react";

export enum SwitchState {
	ON = "ON",
	OFF = "OFF",
}

export interface SwitchProps {
	defaultState?: SwitchState;
	onChange?(state: SwitchState): void;
	onInit?(state: SwitchState): void;
	disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ onInit, onChange, defaultState, disabled }) => {
	const [state, setState] = useState<SwitchState>(defaultState || SwitchState.OFF);

	useEffect(() => {
		setState(defaultState || SwitchState.OFF);
		if(onInit)onInit(state);
	}, [defaultState]);

	const changeState = () => {
		if (!disabled ) {
			if(state == SwitchState.ON){
				setState(SwitchState.OFF);
				if(onChange)onChange(SwitchState.OFF);
			}
			else{
				setState(SwitchState.ON);
				if(onChange)onChange(SwitchState.ON);
			}
			
		}
	};

	return (
		<div
			className={`switch bg-primary ${state == SwitchState.ON ? "on" : "off"} ${
				disabled ? "disabled" : ""
			}`}
			onClick={() => changeState()}
		>
			<div className="switch-toogle bg-background"></div>
		</div>
	);
};
