"use client";
import organizerRegisterFormValidation from "@/lib/formvalidation/organizerRegister";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomTextArea from "../common/CustomTextArea";
import DragAndDropImage from "../common/DragAndDropImage";
import { InputField } from "../common/InputField";
import SocialMedia from "../common/SocialMedia";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { Label } from "../ui/label";

type formData = z.infer<typeof organizerRegisterFormValidation>;

interface props {
  className?: string;
}
const RegisterOrganizer = ({ className }: props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm<formData>({
    resolver: zodResolver(organizerRegisterFormValidation),
    defaultValues:{
      social_links:[{name:"", url:""}]
    }
  });

  const formSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      className={cn(`flex flex-col gap-2 ${className}`)}
      onSubmit={formSubmit}
    >
      <InputField
        type="text"
        label="Organizer Name"
        {...register("organizer_name")}
        errorMessage={errors.organizer_name?.message}
      />

      <InputField
        type="text"
        label="Address"
        {...register("address")}
        errorMessage={errors.address?.message}
      />

      <div className="space-y-1">
        <Label>Social Links</Label>
        <SocialMedia control={control} error={errors.social_links}/>
      </div>

      <div className="space-y-1">
        <Label>Logo</Label>

        <FormField
          name="logo"
          control={control}
          render={({ field }) => {
            return (
              <DragAndDropImage
                className="h-[200px]"
                onChange={(e) => {
                  field.onChange(e);
                }}
                errorMessage={errors.logo?.message as string}
              />
            );
          }}
        />
      </div>

      <CustomTextArea
        label="Description"
        {...register("description")}
        errorMessage={errors.description?.message}
      />

      <InputField
        type="url"
        label="Website"
        {...register("website")}
        errorMessage={errors.website?.message}
      />
      <Button type="submit" className="block w-full mt-5">
        Submit
      </Button>
    </form>
  );
};

export default RegisterOrganizer;
