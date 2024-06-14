import { LoaderButton } from "@/components/custom/LoaderButton";
import { Input } from "@/shadcn/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const adminFormSchema = z.object({
  email: z.string().email().max(120),
  password: z.string().min(12),
});
export function AdminLogin() {
  const [passShow, setPassShow] = useState<boolean>(false);

  adminFormSchema;

  const {
    formState: { errors },
    setValue,
    watch,
    trigger,
    handleSubmit,
  } = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm = (values: z.infer<typeof adminFormSchema>) => {
    values;
  };
  errors;
  return (
    <main className=" w-full flex items-center justify-center">
      <form
        className="w-[90%] sm:w-[74%] md:w-[60%] lg:w-[37%] xl:w-[32%] min-h-96 border rounded-md shadow-md p-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="w-full flex justify-center items-center h-16">
          <h1 className="text-2xl font-semibold">Admin Signin</h1>
        </div>
        <div className="w-full flex flex-col mt-5 gap-7">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-[#474747]">
              Enter email address
            </label>
            <div>
              <Input
                className="h-12"
                onChange={(e) => {
                  setValue("email", e.target.value);
                  trigger("email");
                }}
                value={watch("email")}
                placeholder="Email address"
                type="email"
              />
              {errors && errors.email && errors.email.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.email.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-[#474747]">
              Enter password
            </label>
            <div>
              <div className="relative">
                <Input
                  className="h-12"
                  onChange={(e) => {
                    setValue("password", e.target.value);
                    trigger("password");
                  }}
                  value={watch("password")}
                  placeholder="Password"
                  type={!passShow ? "password" : "text"}
                />
                <div
                  className="absolute right-4 top-3 cursor-pointer text-[#474747]"
                  onClick={() => setPassShow(!passShow)}
                >
                    {/*  */}
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
              {errors && errors.password && errors.password.message && (
                <>
                  <span className="text-[12px] text-red-600">
                    {errors.password.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full h-12">
            <LoaderButton
              type="submit"
              loading={false}
              className="bg-green-500"
            >
              Submit
            </LoaderButton>
          </div>
        </div>
      </form>
    </main>
  );
}
