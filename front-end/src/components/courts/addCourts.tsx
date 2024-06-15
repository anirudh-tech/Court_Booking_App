import { listAlsports } from "@/redux/actions/sportAcion";
import { AppDispatch, RootState } from "@/redux/store";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ChildProp {
  closeModal: () => void;
}
export const AddCourts = ({ closeModal }: ChildProp) => {
  closeModal;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(listAlsports());
  }, [dispatch]);
  const { sports } = useSelector((state: RootState) => state.sport);
  return (
    <form className="w-full min-h-48 p-6 bg-white rounded-md ">
      <div className="w-full">
        <span className="font-semibold">Add court</span>
      </div>
      <div className="w-full  gap-3 grid grid-cols-1 md:grid-cols-2 items-center justify-center flex-col  rounded-md mt-5">
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px]">
            Court name
          </label>
          <Input type="text" placeholder="enter court name" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px]">
            Select Sport
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
            
                {sports?.map((sport) => (
                  <SelectItem value={String(sport._id)} className="flex gap-2 cursor-pointer">
                    <div className="flex gap-2 py-2 cursor-pointer">
                      <img src={sport?.image} className="w-5" alt="" />
                      {sport.sportName}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};
