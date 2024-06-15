import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Trash } from "lucide-react";

interface ChildProp {
  courtId: string;
}
export function CourtDeleteDialog({ courtId }: ChildProp) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-0 border-0 w-auto ">
        <button
          className="size-9 flex items-center justify-center cursor-pointer bg-red-500 rounded-md text-white"
        //   onClick={() => handleDelete(String(court?._id))}
        >
          <Trash className="w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
