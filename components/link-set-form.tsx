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
import { useLinkStore } from "@/app/store";
import { v4 as uuidv4 } from "uuid";
import { LinkSetType } from "@/types";

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

export function AddLinkSetForm({
  setActiveTab,
  addLinkSetFormRef,
  scrollAreaViewportRef,
  closeDialog,
}: {
  setActiveTab: (linkSetID: string) => void;
  addLinkSetFormRef: React.RefObject<HTMLFormElement>;
  scrollAreaViewportRef: React.RefObject<HTMLDivElement>;
  closeDialog: () => void;
}) {
  const addLinkSet = useLinkStore((state) => state.addLinkSet);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    const newLinkSetID = uuidv4();
    addLinkSet({ id: newLinkSetID, ...data });
    setTimeout(() => {
      if (scrollAreaViewportRef.current) {
        // scroll scrollAreaViewport to bottom when new link set is added
        scrollAreaViewportRef.current.scrollTop =
          scrollAreaViewportRef.current.scrollHeight;
      }
      setActiveTab(newLinkSetID);
    }, 0);
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

export function EditLinkSetForm({
  linkSet,
  editLinkSetFormRef,
  closeDialog,
}: {
  linkSet: LinkSetType;
  editLinkSetFormRef: React.RefObject<HTMLFormElement>;
  closeDialog: () => void;
}) {
  const editLinkSet = useLinkStore((state) => state.editLinkSet);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: linkSet?.name ?? "",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - 'links' is refined from string to string[]
      links: linkSet?.links.join("\n") ?? "",
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    editLinkSet({ id: linkSet.id, ...data });
    closeDialog();
  }

  return (
    <Form {...form}>
      <form
        ref={editLinkSetFormRef}
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
