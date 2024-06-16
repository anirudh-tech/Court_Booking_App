import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";

import { Edit, X } from "lucide-react";
import { CustomModal } from "@/components/Moda";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { deleteSport } from "@/redux/actions/sportAcion";
import { format } from "date-fns";
import { listAllCourts } from "@/redux/actions/courtAction";
import { AddCourts } from "@/components/courts/AddCourt";
import { CourtDeleteDialog } from "@/components/courts/courtDeleteDialog";
import { EditCourt } from "@/components/courts/EditCourt";
export function AdminCourts() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(listAllCourts());
  }, [dispatch]);
  const { courts } = useSelector((state: RootState) => state.court);
  const modalCloseRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    modalCloseRef.current?.click();
  };

  const handleDelete = (sportId: string) => {
    dispatch(deleteSport(sportId));
  };
  return (
    <main className="w-full h-full p-5 flex flex-col gap-2 justify-center">
      <div className="mx-auto h-14 flex items-center justify-end w-[90%]">
        <CustomModal
          TriggerComponent={
            <button className="h-10 flex items-center justify-center px-4 bg-green-500 rounded-md text-white">
              Add court
            </button>
          }
          className="w-[90%] sm:w-[75%] md:w-[76%] lg:w-[48%] xl:w-[40%] p-0 rounded-md"
          closeComponent={
            <div className="cursor-pointer z-20" ref={modalCloseRef}>
              <X className="w-6" />
            </div>
          }
        >
          <AddCourts closeModal={closeModal} />
        </CustomModal>
      </div>
      <Table className="w-[90%]  p-3 border rounded-md mx-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <TableCaption>listing all sports </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[270px]">court name</TableHead>
            <TableHead className="">sports</TableHead>
            <TableHead className="min-w-[150px] ">normal price</TableHead>
            <TableHead className="text-right min-w-[150px] md:w-auto">
              special price
            </TableHead>
            <TableHead className="text-right min-w-[150px] md:w-auto">
              added at
            </TableHead>
            <TableHead className="text-right ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courts?.map((court) => {
            return (
              <TableRow key={court?._id}>
                <TableCell className="font-medium">
                  {court?.courtName}
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <img
                    src={court?.sportId.split("[(*)]")[1]}
                    className="w-7"
                    alt=""
                  />
                  <span>{court?.sportId.split("[(*)]")[0]}</span>
                </TableCell>
                <TableCell>₹ {court?.normalcost?.price}</TableCell>
                <TableCell className="text-right">
                  {court?.specialcost?.price ? (
                    <>₹ {court?.specialcost?.price}</>
                  ) : (
                    "-----"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {court?.updatedAt && format(String(court?.updatedAt), "PPP")}
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <CustomModal
                    TriggerComponent={
                      <button
                        className="size-9 flex items-center justify-center cursor-pointer bg-blue-500 rounded-md text-white"
                        onClick={() => handleDelete(String(court?._id))}
                      >
                        <Edit className="w-5" />
                      </button>
                    }
                    className="w-[90%] sm:w-[75%] md:w-[76%] lg:w-[48%] xl:w-[40%] p-0 rounded-md"
                    closeComponent={
                      <div className="cursor-pointer z-20" ref={modalCloseRef}>
                        <X className="w-6" />
                      </div>
                    }
                  >
                    <EditCourt courtDetail={court} closeModal={closeModal} />
                  </CustomModal>

                  <CourtDeleteDialog courtId={String(court?._id)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
