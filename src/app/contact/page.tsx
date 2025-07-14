"use client"
import Navbar from "../../components/Navbar"

export default function Contact() {
  return (
    <div className="w-screen h-screen flex flex-col items-center animate-fade-in">
      <Navbar />
      <div className="flex-1 flex items-center justify-center w-full">
        <h1 className="text-4xl font-bold">Contact</h1>
      </div>
    </div>
  );
}
