"use client"

import { useRef, useState } from "react";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
	const fadePanelRef = useRef<HTMLDivElement>(null);
	const [navVisible, setNavVisible] = useState(true);

	const fadeTransition = () => {
		setNavVisible(false);
		const panel = fadePanelRef.current;
		if (panel) {
			panel.style.opacity = "1";
			panel.style.pointerEvents = "auto";
		}
		setTimeout(() => {
			if (panel) {
				panel.style.opacity = "0";
				panel.style.pointerEvents = "none";
			}
			setNavVisible(true);
		}, 1000);
	};

	return (
		<>
			<div
				ref={fadePanelRef}
				className="fixed inset-0 bg-white z-40 opacity-0 pointer-events-none transition-opacity duration-1000"
			></div>
			<nav className={`w-full h-16 flex items-center justify-center absolute top-0 font-bold gap-24 z-50 text-xl transition-opacity duration-1000 ${navVisible ? 'opacity-100' : 'opacity-0'}`}>
				<TransitionLink href="/?skip=true" transitionFunction={() => fadeTransition()} className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Home</TransitionLink>
				<TransitionLink href="/about-me" transitionFunction={() => fadeTransition()} className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">About Me</TransitionLink>
				<TransitionLink href="/tools" transitionFunction={() => fadeTransition()} className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Tools</TransitionLink>
				<TransitionLink href="/projects" transitionFunction={() => fadeTransition()} className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Projects</TransitionLink>
				<TransitionLink href="/resume" transitionFunction={() => fadeTransition()} className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Resume</TransitionLink>
				<TransitionLink href="/contact" transitionFunction={() => fadeTransition()} className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Contact</TransitionLink>
			</nav>
		</>
	)
}