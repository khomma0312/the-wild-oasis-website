"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterType = "all" | "small" | "medium" | "large";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = (searchParams.get("capacity") as FilterType) ?? "all";

  function handleFilter(filter: FilterType) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="border border-l-primary-800 flex">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({
  children,
  filter,
  activeFilter,
  handleFilter,
}: {
  children: string;
  filter: FilterType;
  activeFilter: FilterType;
  handleFilter: (filter: FilterType) => void;
}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
