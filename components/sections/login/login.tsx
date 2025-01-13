"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import login from "@/services/auth/login";
import { isActionError } from "@/utils/error";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/common/loader";

// Form validation schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Initialize the form using react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);

      if (isActionError(response)) {
        toast.error(response.message);
      } else {
        toast.success("Login successful!");
        router.push("/movies");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mx-auto w-full px-6 z-10">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-white font-semibold text-center text-5xl md:text-[64px] leading-[56px] md:leading-[80px] mb-10 w-full">
          Sign in
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex items-center justify-center"
          >
            <div className="grid gap-6 w-full md:w-[300px]">
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-2 justify-center">
                <Checkbox
                  id="remember-me"
                  className="rounded-[5px] text-white border-none bg-foreground"
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm text-white leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-[54px] rounded-[10px] text-base font-bold text-white"
                disabled={loading}
                tabIndex={3}
              >
                {loading ? <Loader /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Footer */}
        <div className="px-6 pb-6 -mt-2">
          <div className="mt-4 text-center text-sm text-white">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline" tabIndex={5}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;
