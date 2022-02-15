import { Icon } from "@iconify/react";
import gsap , {} from "gsap";
import React, { Children, isValidElement, ReactElement, useEffect, useRef, useState } from "react";

const BreadCrumbs: React.FC = ({ children }) => {
	
	const getBreadCrumbsLinks = () => {
		return Children.map(children, (child,i) => {
			if (isValidElement(child) && (child as ReactElement<any>).type == BreadCrumbsLink) {
				return (
					<>
						{child}
						{i+1 < Children.count(children)&&
							<Icon className="separator" icon={'dashicons:arrow-up-alt2'}/>
						}
					</>
				);
			}
		});
	};
	const [links, setLinks] = useState(getBreadCrumbsLinks());
	const containerRef = useRef();

	const animations = () => {
		const el = containerRef.current || '';
		const tl = gsap.timeline();
		tl.fromTo(el, {opacity:0, xPercent:-500}, {opacity:1, xPercent:0, ease:"back"});
	};

	useEffect(()=>{
		animations();
	},[])

	return <div className="breadcrumbs" ref={containerRef as any}>{links}</div>;
};

type BreadCrumbLinkProps = {
	text?: string;
	onSelect?():void;
	current?:boolean;
};

const BreadCrumbsLink: React.FC<BreadCrumbLinkProps> = ({ text, onSelect, current }) => {
	return (
		<p  className={`link ${current&&'current'}`} onClick={()=>onSelect&&onSelect()}>
			{text}
		</p>
	);
};

export { BreadCrumbs, BreadCrumbsLink  };
