export const dynamic = "force-dynamic";

export default function ShoppingCartLayout({ children }: { children: React.ReactNode }) {
	return <div className='mx-auto px-5 max-w-5xl'>{children}</div>;
}
