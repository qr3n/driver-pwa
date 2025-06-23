// app/drivers/[id]/page.tsx
import { fetchDriverProfile } from './model/api';
import CustomerBasicInfo from "@/app/customers/[id]/CustomerBasicInfo";
import CustomerReviews from "@/app/customers/[id]/CustomerReviews";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const driverData = await fetchDriverProfile(id);

    return (
        <div className="overflow-y-auto overflow-x-hidden mt-24 py-4 pb-24 px-4 sm:px-6 lg:px-8">
            <div className='fixed bottom-0 left-0 h-[100dvh] w-[100dvw] bg-gradient-to-b from-transparent to-black'/>
            <div className="max-w-4xl mx-auto relative">
                {/* Градиентные круги */}
                <div className="absolute z-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-red-500 blur-3xl opacity-40 -top-10 -left-10"></div>
                <div className="absolute z-10 w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 blur-3xl opacity-30 top-4 right-6"></div>
                <div className="absolute z-10 w-36 h-36 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 blur-3xl opacity-25 bottom-0 left-1/2 transform -translate-x-1/2"></div>

                <CustomerBasicInfo
                    {...driverData}
                />

                <CustomerReviews reviews={driverData.reviews}/>
            </div>
        </div>
    );
}