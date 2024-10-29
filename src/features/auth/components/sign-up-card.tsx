import { z } from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { registerSchema } from "../schemas"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRegister } from "@/app/(auth)/api/register-login"
import { zodResolver } from "@hookform/resolvers/zod"
import { DottedSeparator } from "@/components/my-components/dotted-separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form"

export const SignUpCard = () => {
  const { mutate } = useRegister()


  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values })
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Cadastre-se!
        </CardTitle>
        <CardDescription >
          descrição aqui
        </ CardDescription >
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Informe seu nome"
                    /></FormControl>
                  <FormMessage />
                </FormItem>)} />
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
                    /></FormControl>
                  <FormMessage />
                </FormItem>)} />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Informe sua senha" />
                  </FormControl>
                  <FormMessage />
                </FormItem>)} />
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
          className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Login com Google
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Já possui cadastro?&nbsp;
          <Link href="/sign-in">
            <span className="text-blue-700">
              Acessar conta
            </span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
