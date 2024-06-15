import { UploadCloud } from "lucide-react";
import { LoaderButton } from "../custom/LoaderButton";
import { Input } from "@/shadcn/ui/input";

export const AddSports = () => {
  return (
    <form className="w-full min-h-48 p-6 bg-white rounded-md ">
      <div className="mx-auto h-28 flex items-center justify-center  rounded-md mt-3">
        <div className="w-full h-[70%] border flex-col p-3 rounded-md flex items-center justify-center">
          <UploadCloud className="w-5" />
          <span>Click and upload image</span>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="" className="text-[14px]">
          Enter sports name
        </label>
        <Input type="text" placeholder="sports name" />
      </div>
      <div className="w-full flex justify-end mt-3">
        <LoaderButton
          className="bg-green-500 h-10"
          type="submit"
          loading={false}
        >
          Submit
        </LoaderButton>
      </div>
    </form>
  );
};
