"use client"
import { useRouter } from "next/navigation";

interface TransitionLinkProps {
  href: string;
  transitionFunction: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink(props: TransitionLinkProps) {
	const { href, transitionFunction, children, className } = props;

	const router = useRouter();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		transitionFunction();
		// Wait for the transition to complete before navigating
		setTimeout(() => {
			router.push(href)
		}, 1000); // Adjust the timeout to match your transition duration
	};

	return (
		<a
		href={href}
		onClick={handleClick}
		className={className}
		>
		{children}
		</a>
	);
}