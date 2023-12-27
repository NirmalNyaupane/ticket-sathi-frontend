"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { InputField, InputFieldWithRightIcon } from "../common/InputField";
import { Button } from "../ui/button";
import { EmailVerificationEnum, UserRoleEnum } from "@/constants/enum";
import { Checkbox } from "../ui/checkbox";
import { loginFormValidation } from "@/lib/formvalidation/authvalidation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "../common/LoadingButton";
import { showError } from "@/utils/healper";
import { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
type formData = z.infer<typeof loginFormValidation>;

const Login = ({ user }: { user: UserRoleEnum }) => {
  /******************* state **************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState<boolean>(false);

  /********************** Hooks  *******************************/
  const router = useRouter();

  /************************ Methods *************************/

  /******* React hook form for form handling *****************/
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<formData>({
    resolver: zodResolver(loginFormValidation), //zod validaton
  });

  /******************** React query mutation  ****************/
  const loginMutation = useMutation({
    mutationFn: (data: formData) => {
      return loginApi(data);
    },
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        description: showError(error),
        duration: 1000,
        variant: "destructive",
      });

      if (error.response?.data?.is_verified === false) {
        router.push(
          `/email-verify?email=${getValues("email")}&action=${
            EmailVerificationEnum.NewRegister
          }`
        );
      }
    },
  });

  /*** Handle the form after submission ***/
  const handleFormSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      <InputField
        type="email"
        label="Email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />

      <InputFieldWithRightIcon
        label="Password"
        type={!isPasswordShow ? "password" : "text"}
        rightIcon={
          !isPasswordShow ? (
            <Eye className="cursor-pointer" />
          ) : (
            <EyeOff className=" cursor-pointer" />
          )
        }
        onRightIconClicked={() => {
          setPasswordShow(!isPasswordShow);
        }}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={keepMeLoggedIn}
            onCheckedChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Keep me logged in
          </label>
        </div>
        <div className="ml-auto font-medium text-red-500">Forget Password?</div>
      </div>

      <LoadingButton type="submit" isLoading={loginMutation.isPending}>
        Login
      </LoadingButton>

      {user === UserRoleEnum.USER && (
        <>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
            OR SIGN UP USING
          </p>
          <div className="text-center my-3">
            <Button className="bg-white text-black border-black border-2 hover:text-white">
              <FaGoogle />
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default Login;
