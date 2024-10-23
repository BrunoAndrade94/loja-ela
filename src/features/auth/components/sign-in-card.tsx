import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { loginSchema } from "../schemas"

import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DottedSeparator } from "@/components/my-components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form"
import { useLogin } from "@/app/(auth)/api/use-login"

export const SignInCard = () => {
  const { mutate } = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values)
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Boas vindas de novo!
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Informe seu melhor e-mail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Informe sua senha"
                    />
                  </FormControl >
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant="teritary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login com Google
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Ainda não possui cadastro?&nbsp;
          <Link href="/sign-up">
            <span className="text-blue-700">
              Cadastre-se
            </span>
          </Link>
        </p>
      </CardContent>
    </Card >
  )
}