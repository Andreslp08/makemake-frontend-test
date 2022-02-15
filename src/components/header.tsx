import React, { useEffect, useState } from "react";
import { Switch, SwitchState } from "./switch";
import Logo from "../assets/images/logo-makemake.png";
import { Icon } from "@iconify/react";

export const Header: React.FC = () => {
    const [navVisible, setNavVisible] = useState(false);
	
    const loadTheme = () => {
		const theme = localStorage.getItem("theme");
		if (theme) document.body.dataset.theme = theme;
	};

	const handleTheme = (state: SwitchState) => {
		let theme = "light";
		if (state == SwitchState.ON) {
			theme = "dark";
		}
		document.body.dataset.theme = theme;
		localStorage.setItem("theme", theme);
	};

	const defaultThemeSwitchState = (): SwitchState => {
		const theme = localStorage.getItem("theme");
		if (theme) {
			switch (theme) {
				case "light":
					return SwitchState.OFF;
				case "dark":
					return SwitchState.ON;
				default:
					return SwitchState.OFF;
			}
		} else {
			return SwitchState.OFF;
		}
	};

	useEffect(() => {
		loadTheme();
	}, []);

	return (
		<div className="header">
			<img src={Logo} alt="MakeMake logo" className="logo" />
			<div className="flex items-center">
				<Icon
					icon="carbon:light-filled"
					className="color-onsurface  m-0.5"
					width={"12px"}
				/>
				<Switch onChange={handleTheme} defaultState={defaultThemeSwitchState()} />
				<Icon icon="bi:moon-fill" className="color-onsurface m-0.5" width={"12px"} />
			</div>
			<MobileButton onClose={()=>setNavVisible(false)} onOpen={()=>setNavVisible(true)} />
            <div className={`nav ${navVisible&&'visible'}`}>
               <h3 className="color-onbackground">Aquí van cosas ... :)</h3>
            </div>
		</div>
	);
};

interface MobileButtonProps {
	onOpen?(): void;
	onClose?(): void;
}

const MobileButton: React.FC<MobileButtonProps> = ({ onClose, onOpen }) => {
	const [visible, setVisible] = useState(false);

	const handleVisibility = () => {
		setVisible(!visible);
	};

	useEffect(() => {
		if (visible) {
			if (onOpen) onOpen();
		} else {
			if (onClose) onClose();
		}
	}, [visible]);

	return (
		<div className="mobile-button" onClick={() => handleVisibility()}>
			{visible ? 
            <Icon icon="bi:x-lg"  className="icon" width={25}/>
            :<Icon icon="charm:menu-hamburger" className="icon" width={25} /> }
		</div>
	);
};
