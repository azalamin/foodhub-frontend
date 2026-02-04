"use client";

import { cn } from "@/lib/utils";
import { Check, ClipboardList, CookingPot, Gift, Zap } from "lucide-react";

const STEPS = [
	{ id: "PLACED", label: "Placed", icon: ClipboardList },
	{ id: "PREPARING", label: "Cooking", icon: CookingPot },
	{ id: "READY", label: "Ready", icon: Zap },
	{ id: "DELIVERED", label: "Enjoy", icon: Gift },
];

export function OrderStepper({ currentStatus }: { currentStatus: string }) {
	if (currentStatus === "CANCELLED") {
		return (
			<div className='text-center py-6 bg-red-50 rounded-3xl border-2 border-dashed border-red-200'>
				<p className='text-red-500 font-black text-xl uppercase tracking-widest italic'>
					Order Cancelled
				</p>
			</div>
		);
	}

	const currentStepIndex = STEPS.findIndex(s => s.id === currentStatus);
	const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

	// Check if the journey is finished
	const isDelivered = currentStatus === "DELIVERED";

	return (
		<div className='relative flex items-center justify-between w-full px-2 py-4'>
			{/* Background Line */}
			<div className='absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full' />

			{/* Progress Line - Turns GREEN on success */}
			<div
				className={cn(
					"absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full transition-all duration-1000 ease-in-out",
					isDelivered ? "bg-green-500" : "bg-primary",
				)}
				style={{
					width: `${(activeIndex / (STEPS.length - 1)) * 100}%`,
				}}
			/>

			{STEPS.map((step, index) => {
				const Icon = step.icon;
				const isCompleted = index < activeIndex;
				const isActive = index === activeIndex;

				return (
					<div key={step.id} className='relative z-10 flex flex-col items-center gap-3'>
						<div
							className={cn(
								"h-12 w-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500",
								// Completed steps turn Green if delivered, otherwise Primary
								isCompleted || (isDelivered && isActive)
									? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20"
									: isActive
										? "bg-card border-primary text-primary scale-125 shadow-lg shadow-primary/20"
										: "bg-card border-muted text-muted-foreground",
								// Special case for completed steps BEFORE delivery is finished
								isCompleted && !isDelivered && "bg-primary border-primary",
							)}
						>
							{isCompleted || (isDelivered && isActive) ? (
								<Check size={20} strokeWidth={3} className='animate-in zoom-in duration-300' />
							) : (
								<Icon size={20} className={isActive ? "animate-pulse" : ""} />
							)}
						</div>

						{/* Label */}
						<span
							className={cn(
								"text-[10px] font-black uppercase tracking-tighter absolute -bottom-10 whitespace-nowrap transition-colors",
								isDelivered && index === activeIndex
									? "text-green-600"
									: isActive
										? "text-primary"
										: "text-muted-foreground",
							)}
						>
							{isDelivered && index === activeIndex ? "Delivered!" : step.label}
						</span>
					</div>
				);
			})}
		</div>
	);
}
