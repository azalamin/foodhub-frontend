import { ProviderOrderTable } from "@/components/modules/orders/order-table";
import { Button } from "@/components/ui/button";
import { orderService } from "@/service/order.service";
import { Filter, ShoppingBasket } from "lucide-react";
import { Suspense } from "react";
import Loading from "../../loading";

export default function ProviderAllOrdersPage() {
	return (
		<div className='space-y-10 pb-10'>
			{/* --- HEADER (Shows up instantly) --- */}
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
				<div className='space-y-1'>
					<div className='flex items-center gap-2 text-emerald-600 mb-1'>
						<ShoppingBasket size={20} />
						<span className='text-[10px] font-black uppercase tracking-[0.3em]'>Live Kitchen</span>
					</div>
					<h1 className='text-4xl font-black tracking-tight italic uppercase'>
						Incoming <span className='text-emerald-500'>Orders</span>
					</h1>
					<p className='text-muted-foreground font-medium'>
						Manage and track your kitchen&apos;s active flow.
					</p>
				</div>

				<Button
					variant='outline'
					className='h-12 px-6 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest gap-2'
				>
					<Filter size={14} /> Filter Orders
				</Button>
			</div>

			{/* --- DATA FETCHING AREA --- */}
			<Suspense fallback={<Loading />}>
				<OrdersTableContainer />
			</Suspense>
		</div>
	);
}

async function OrdersTableContainer() {
	const { data } = await orderService.getProviderAllOrders();
	return <ProviderOrderTable orders={data} />;
}
