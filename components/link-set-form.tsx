"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// https://stackoverflow.com/a/49283749 : check if link is valid
const isValidLink = (link: string) => {
  try {
    return link && Boolean(new URL(link));
  } catch (e) {
    return false;
  }
};

const profileFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  // https://github.com/colinhacks/zod/issues/2684#issuecomment-1735685715 : multiline validation
  links: z
    .string()
    .refine(
      (lines) => {
        const splittedLines = lines.split("\n");
        const matchedLines = splittedLines.filter((line) => isValidLink(line));
        return matchedLines.length === splittedLines.length && lines.length;
      },
      (lines) => {
        const failedLines = lines
          .split("\n")
          .map((line, index) => {
            return { data: line, index };
          })
          .filter((line) => !isValidLink(line.data))
          .map((line) => `${line.index + 1}`);
        return {
          message: lines.length
            ? `The ${
                failedLines.length === 1 ? "link" : "links"
              } on the following ${
                failedLines.length === 1 ? "line is" : "lines are"
              } invalid: ${failedLines.join(", ")}`
            : "Required",
        } as z.CustomErrorParams;
      }
    )
    .transform((lines) => lines.split("\n")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function AddLinkSetForm({
  addLinkSetFormRef,
  closeDialog,
}: {
  addLinkSetFormRef: React.RefObject<HTMLFormElement>;
  closeDialog: () => void;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(JSON.stringify(data, null, 2));
    closeDialog();
  }

  return (
    <Form {...form}>
      <form
        ref={addLinkSetFormRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Link Set" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add each link on a separate line."
                  className="h-48 max-h-80 resize-none sm:resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
