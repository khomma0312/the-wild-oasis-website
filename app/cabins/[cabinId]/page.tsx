import { Metadata } from "next";
import { getCabin } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import CabinDetails from "@/app/_components/CabinDetails";

export async function generateMetadata({
  params,
}: {
  params: { cabinId: string };
}): Promise<Metadata> {
  const cabinId = parseInt(params.cabinId);
  const { name } = await getCabin(cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   const ids = cabins.map((cabin) => ({ cabinId: `${cabin.id}` }));

//   return ids;
// }

export default async function Page({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabinId = parseInt(params.cabinId);
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDetails cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
