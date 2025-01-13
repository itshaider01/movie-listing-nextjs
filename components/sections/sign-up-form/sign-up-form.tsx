"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Loader from "@/components/common/loader";
import Link from "next/link";
import register from "@/services/auth/register";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number"
    ),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

function RegisterSection() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords must match",
      });
      return;
    }

    setLoading(true);

    try {
      const resp = await register(values.email, values.password);
      if (resp) {
        toast.success("Registration successful");
        router.push("/login");
      } else {
        toast.error("registeration fail");
      }
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mx-auto w-full px-6 z-10">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-white font-semibold text-center text-5xl md:text-[64px] leading-[56px] md:leading-[80px] mb-10 w-full">
          Sign up
        </h1>
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex items-center justify-center"
            >
              <div className="grid gap-6 w-[300px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          {...field}
                          tabIndex={1}
                          className="h-[45px] text-white bg-foreground border-none rounded-[10px] w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...field}
                          tabIndex={2}
                          className="h-[45px] text-white bg-foreground border-none rounded-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                          tabIndex={3}
                          className="h-[45px] text-white bg-foreground border-none rounded-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-[54px] rounded-[10px] text-base font-bold"
                  disabled={loading}
                  tabIndex={4}
                >
                  {loading ? <Loader /> : "Sign Up"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="px-6 pb-6 -mt-2">
            <div className="mt-4 text-center text-sm text-white">
              Already have an account?{" "}
              <Link href="/login" className="underline" tabIndex={5}>
                Sign in
              </Link>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default RegisterSection;
