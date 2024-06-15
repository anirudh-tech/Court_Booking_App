import { Edit, Trash, UploadCloud } from "lucide-react";
import { LoaderButton } from "../custom/LoaderButton";
import { Input } from "@/shadcn/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { editSport } from "@/redux/actions/sportAcion";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloud";
import { Sport } from "@/types/sportsReducerInita";
import { imageUrlToFileObject } from "@/utils/imageToFile";

const imageSchema = z.custom<FileList>();
const addSportSchema = z.object({
  image: imageSchema
    .nullable()
    .refine((value) => value, { message: "image is not null" }),
  sportName: z.string().nonempty().min(3).max(30),
});

interface ChildProp {
  closeModal: () => void;
  sportData: Sport;
}

export const EditSport = ({ closeModal, sportData }: ChildProp) => {
  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof addSportSchema>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(addSportSchema),
    defaultValues: {
      image: null,
      sportName: "",
    },
  });

  useEffect(() => {
    setValue("sportName", sportData.sportName);
    imageUrlToFileObject(String(sportData?.image)).then((res) => {
      setValue("image", res as unknown as FileList);
    });
  }, [sportData]);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const submitAddSports = async (values: z.infer<typeof addSportSchema>) => {
    setLocalload(true);
    const image = (await uploadImageToCloudinary(values.image)) as string;
    dispatch(
      editSport({
        sportId: String(sportData._id),
        sendPayload: {
          sportName: values.sportName,
          image: image,
        },
      })
    )
      .then((res) => {
        if (res.type.endsWith("fulfilled")) {
          closeModal();
        }
      })
      .finally(() => {
        setLocalload(false);
      });
  };
  const { loading } = useSelector((state: RootState) => state.sport);
  const [localload, setLocalload] = useState<boolean>(false);
  return (
    <form
      className="w-full min-h-48 p-6 bg-white rounded-md "
      onSubmit={handleSubmit(submitAddSports)}
    >
      <div className="mx-auto h-28 flex items-center justify-center flex-col  rounded-md mt-3">
        <input
          type="file"
          ref={inputRef}
          hidden
          id="Image"
          onChange={(e) => {
            const file = e?.target?.files?.[0];
            const maxSizeInMB = 10; // Maximum file size in MB
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            if (file && file?.size > maxSizeInBytes) {
              toast.error(
                `File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`
              );
              return;
            }
            setValue("image", file as unknown as FileList | null);
            trigger("image");
          }}
        />
        <label
          onClick={() => {
            inputRef.current?.click();
          }}
          className="w-full cursor-pointer h-[70%] border flex-col p-3 rounded-md flex items-center justify-center relative"
        >
          {!watch("image") ? (
            <>
              <UploadCloud className="w-5" />
              <span>Click and upload image</span>
            </>
          ) : (
            <>
              <img
                src={URL.createObjectURL(
                  watch("image") as unknown as Blob | MediaSource
                )}
                className="h-full"
                alt=""
              />
            </>
          )}
          {watch("image") && (
            <>
              <div
                className="absolute right-2 bottom-2 w-12 h-16 items-end gap-2 black flex flex-col z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <Trash
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("image", null);
                    }}
                    className="w-5 cursor-pointer"
                  />
                </div>
                <div>
                  <Edit
                    className="w-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </label>
        <div className="w-full flex justify-start">
          {errors && errors.image && errors.image.message && (
            <>
              <span className="text-[12px] text-red-600">
                {errors.image.message}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-start">
        <label htmlFor="" className="text-[14px]">
          Enter sports name
        </label>
        <Input
          type="text"
          value={watch("sportName")}
          placeholder="sports name"
          onChange={(e) => {
            setValue("sportName", e.target.value);
            trigger("sportName");
          }}
        />
        <div>
          {errors && errors.sportName && errors.sportName.message && (
            <>
              <span className="text-red-600 text-[12px]">
                {errors.sportName.message}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end mt-3">
        <LoaderButton
          className="bg-green-500 h-10"
          type="submit"
          loading={loading || localload}
        >
          Submit
        </LoaderButton>
      </div>
    </form>
  );
};
