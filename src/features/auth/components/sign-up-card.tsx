import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DottedSeparator } from "@/components/my-components/dotted-separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().trim().min(5, "sem nome"),
  email: z.string().email(),
  password: z.string().min(8, "minimo 8")
})

export const SignUpCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Cadastre-se!
        </CardTitle>
        {/* <CardDescription >
          ----
        </ CardDescription > */}
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