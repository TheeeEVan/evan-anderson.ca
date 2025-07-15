"use client"
import Navbar from "../../components/Navbar"

export default function AboutMe() {
  return (
	<div className="w-screen flex flex-col items-center animate-fade-in">
		<Navbar />
	  	<div className="flex-1 flex flex-col items-center w-full gap-4">
			<h1 className="text-4xl font-bold">About Me</h1>
			<p className="text-lg mt-4 max-w-2xl px-5">
				Hi! I'm Evan, a Computing Engineering Student at The University of British Columbia. I love hiking, photography, and all things tech!
			</p>
			<div>
				<img src="/hiking.JPEG" alt="Evan hiking in Banff" className="max-w-full w-2xl mt-4"/>
				<div className="text-center text-gray-600">(Backpacking Twin Falls, Whaleback, and Iceline Loop in 2023)</div>
			</div>
			<p className="text-lg mt-4 max-w-2xl px-5">
				I started programming at a young age, and found a passion for web development during high school. Since then I've been continuously learning and building a variety of projects. These range from for profit businesses, to small community group sites.
			</p>
			<p className="text-lg mt-4 max-w-2xl px-5">
				I've worked with many different people and teams, and have grown a passion for small teams and startups, especially around other students who share similar passions. I've found that these teams can consistently delivery high quality work and always strive to do imrprove, which is the same environment that I thrive in.
			</p>
			<img src="/photography.jpg" alt="Evan's photography" className="max-w-full w-2xl mt-4"/>
			<p className="text-lg mt-4 max-w-2xl px-5">
				When I'm not working at my desk, you can always find me outdoors, whether I'm on a run, a weekend backpack trip, or just taking photos of the view. I've always loved going outside, and I find that it helps me find balance between work and life.
			</p>
			<p className="text-lg mt-4 max-w-2xl px-5">
				I'm always looking for new opportunities, so if you've got a project in mind, or just want to connect, please feel free to reach out! I'd love to chat with you!
			</p>
			<p className="text-lg mt-4 mb-8 max-w-2xl px-5">
				See you on the trails!
			</p>
	  	</div>
	</div>
  );
}