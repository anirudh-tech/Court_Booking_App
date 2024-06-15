import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/shadcn/ui/table";
  
  import { Edit, Trash, X } from "lucide-react";
  import { CustomModal } from "@/components/Moda";
  
  import { AppDispatch, RootState } from "@/redux/store";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useRef } from "react";
  import { deleteSport, listAlsports } from "@/redux/actions/sportAcion";
  import { format } from "date-fns";
  import { EditSport } from "@/components/sports/EditSport";
import { AddCourts } from "@/components/courts/addCourts";
  export function AdminCourts() {
    const dispatch: AppDispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listAlsports());
    }, [dispatch]);
    const { sports } = useSelector((state: RootState) => state.sport);
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
            className="w-[90%] sm:w-[75%] md:w-[66%] lg:w-[40%] xl:w-[34%] p-0 rounded-md"
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
              <TableHead className="w-[190px]">court name</TableHead>
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
            {sports?.map((sport) => {
              return (
                <TableRow key={sport?._id}>
                  <TableCell className="font-medium">
                    {sport?.sportName}
                  </TableCell>
                  <TableCell>
                    <img src={sport?.image} className="w-6" alt="" />
                  </TableCell>
                  <TableCell>
                    {sport?.createdAt && format(String(sport?.createdAt), "PPP")}
                  </TableCell>
                  <TableCell className="text-right">
                    {sport?.updatedAt && format(String(sport?.updatedAt), "PPP")}
                  </TableCell>
                  <TableCell className="text-right">
                    {sport?.updatedAt && format(String(sport?.updatedAt), "PPP")}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <CustomModal
                      TriggerComponent={
                        <button className="size-9 flex items-center justify-center cursor-pointer bg-blue-500 rounded-md text-white">
                          <Edit className="w-5" />
                        </button>
                      }
                      className="w-[90%] sm:w-[75%] md:w-[66%] lg:w-[40%] xl:w-[34%] p-0 rounded-md"
                      closeComponent={
                        <div className="cursor-pointer z-20" ref={modalCloseRef}>
                          <X className="w-6" />
                        </div>
                      }
                    >
                      <EditSport closeModal={closeModal} sportData={sport}/>
                    </CustomModal>
                    <button
                      className="size-9 flex items-center justify-center cursor-pointer bg-red-500 rounded-md text-white"
                      onClick={() => handleDelete(String(sport?._id))}
                    >
                      <Trash className="w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
    );
  }
  