import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/providers/CartContext";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthContext";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "FoodHub",
	description: "Order food from your favorite restaurants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`
					${inter.variable}
					${jakarta.variable}
          ${mono.variable}
					font-sans
					antialiased
				`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider>
						<CartProvider>
							<Toaster richColors />
							{children}
						</CartProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
