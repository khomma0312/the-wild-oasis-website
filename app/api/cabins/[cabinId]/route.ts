import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextApiRequest } from "next";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { cabinId: string } }
) {
  const cabinId = parseInt(params.cabinId);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Cabin not found" });
  }
}
