import { LoaderButton } from "@/components/custom/LoaderButton";
import { Input } from "@/shadcn/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";

export function AdminLogin() {
  const [passShow, setPassShow] = useState<boolean>(false);
  return (
    <main className=" w-full flex items-center justify-center">
      <form className="w-[90%] sm:w-[74%] md:w-[60%] lg:w-[37%] xl:w-[32%] min-h-96 border rounded-md shadow-md p-5">
        <div className="w-full flex justify-center items-center h-16">
          <h1 className="text-2xl font-semibold">Admin Signin</h1>
        </div>
        <div className="w-full flex flex-col mt-5 gap-7">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-[#474747]">
              Enter email address
            </label>
            <Input className="h-12" placeholder="Email address" type="email" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-[#474747]">
              Enter password
            </label>
            <div className="relative">
              <Input
                className="h-12"
                placeholder="Password"
                type={!passShow ? "password" : "text"}
              />
              <div
                className="absolute right-4 top-3 cursor-pointer text-[#474747]"
                onClick={() => setPassShow(!passShow)}
              >
                {passShow ? (
                  <>
                    <EyeOff className="w-5 " />
                  </>
                ) : (
                  <>
                    <EyeIcon className="w-5 " />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-12">
            <LoaderButton type="submit" loading={false} className="bg-green-500">
                Submit
            </LoaderButton>
          </div>
        </div>
      </form>
    </main>
  );
}
