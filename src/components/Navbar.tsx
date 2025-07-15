"use client"

import { useRef, useState } from "react";
import TransitionLink from "./TransitionLink";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
	const fadePanelRef = useRef<HTMLDivElement>(null);
	const [navVisible, setNavVisible] = useState(true);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

	const navLinks = [
		{ href: "/?skip=true", label: "Home" },
		{ href: "/about-me", label: "About Me" },
		{ href: "/tools", label: "Tools" },
		{ href: "/projects", label: "Projects" },
		{ href: "/resume", label: "Resume" },
		{ href: "/contact", label: "Contact" },
	];

	return (
		<>
			<div
				ref={fadePanelRef}
				className="fixed inset-0 bg-white z-40 opacity-0 pointer-events-none transition-opacity duration-1000"
			></div>
			{/* Desktop nav */}
			<nav className={`w-full h-16 items-center justify-around relative top-0 py-4 font-bold z-50 text-xl transition-opacity duration-1000 hidden md:flex ${navVisible ? 'opacity-100' : 'opacity-0'}`}>
				{navLinks.map(link => (
					<TransitionLink
						href={link.href}
						transitionFunction={() => fadeTransition()}
						className="text-black relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
						key={link.href}
					>
						{link.label}
					</TransitionLink>
				))}
			</nav>
			{/* Mobile nav */}
			<nav className="w-full h-16 flex md:hidden items-center justify-end px-4 top-0 py-4 font-bold z-50 text-xl bg-white relative">
				<button
					className="text-black focus:outline-none z-50"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
				>
					{mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
				</button>
				{/* Overlay menu */}
				<div className={`fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}>
					{navLinks.map(link => (
						<TransitionLink
							href={link.href}
							transitionFunction={() => { fadeTransition(); setMobileMenuOpen(false); }}
							className="text-black text-3xl my-4"
							key={link.href}
						>
							{link.label}
						</TransitionLink>
					))}
				</div>
			</nav>
		</>
	)
}