import { getCabins } from "../_lib/data-service";
import CabinCard, { Cabin } from "./CabinCard";

async function CabinList({ filter }: { filter: string }) {
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins = cabins;

  if (filter === "small")
    filteredCabins = cabins.filter((c) => c.maxCapacity <= 3);

  if (filter === "medium")
    filteredCabins = cabins.filter(
      (c) => c.maxCapacity >= 4 && c.maxCapacity <= 7
    );

  if (filter === "large")
    filteredCabins = cabins.filter((c) => c.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
