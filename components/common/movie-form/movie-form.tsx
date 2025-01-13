"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ImageUploadButton from "../upload-button";
import Loader from "../loader";
import { Input } from "@/components/ui/input";
import moment from "moment";

interface FormValues {
  title: string;
  year: string;
  image: string | File;
}

interface MovieFormProps {
  initialValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
}

const validationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  year: z.string().nonempty("Published date is required"),
  image: z.instanceof(File).or(z.string()),
});

const MovieForm: React.FC<MovieFormProps> = ({ initialValues, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formattedYear = initialValues?.year
    ? moment(initialValues.year).format("YYYY-MM")
    : "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: initialValues?.title || "",
      year: formattedYear,
      image: initialValues?.image,
    },
  });

  useEffect(() => {
    const setInitvalues = () => {
      if (typeof initialValues?.image === "string") {
        setImagePreview(initialValues?.image);
        setValue("image", initialValues.image);
      }
    };

    setInitvalues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const onErrors = (errors: unknown) => {
    console.log("form submit errors: ", errors);
  };

  return (
    <div className="mt-20 pb-40 md:pb-5 px-6 md:px-0 md:pt-[120px] min-h-screen">
      <h2 className="text-[32px] text-white leading-10 md:text-5xl md:leading-[56px] font-semibold mb-20 md:mb-[120px]">
        {initialValues?.title ? "Edit" : "Create a new movie"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="flex flex-col-reverse md:flex-row-reverse items-start justify-between gap-[127px]">
          <div className="flex-1">
            <div className="flex flex-col gap-4 mb-4 w-[320px] lg:w-[362px]">
              <div>
                <Input
                  type="text"
                  {...register("title")}
                  placeholder="Title"
                  className="h-[45px] bg-foreground border-none px-4 py-[10px] w-full rounded-[10px] text-white font-sm"
                />
                {errors.title && (
                  <div className="text-red-600 text-xs mt-1">
                    {errors.title.message}
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="month"
                  {...register("year")}
                  className="h-[45px] md:max-w-[216px] bg-foreground border-none px-4 py-[10px] w-full rounded-[10px] text-white font-sm"
                />
                {errors.year && (
                  <div className="text-red-600 text-xs mt-1">
                    {errors.year.message}
                  </div>
                )}
              </div>
              <div className="block md:hidden">
                <ImageUploadButton
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  onImageUpload={(file: string | File) =>
                    setValue("image", file, { shouldValidate: true })
                  }
                  error={errors.image?.message}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4  md:gap-7 mt-10 md:mt-16">
              <button
                type="button"
                className="px-4 py-2 text-base font-bold h-[56px] text-white rounded-[10px] border border-white w-1/2"
              >
                <Link href={"/movies"}>Cancel</Link>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-base flex items-center justify-center font-bold h-[56px] text-white rounded-[10px] w-1/2"
              >
                {isSubmitting ? <Loader /> : "Submit"}
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <ImageUploadButton
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              onImageUpload={(file: string | File) =>
                setValue("image", file, { shouldValidate: true })
              }
              error={errors.image?.message}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
