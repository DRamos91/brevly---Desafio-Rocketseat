// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "./Input";
// import { Button } from "./Button";
// import { createLinkSchema, type CreateLinkFormData } from "../lib/validators";
// import { mockCreateLink } from "../lib/mockLinks";

// export function CreateLinkForm({ onCreated }: { onCreated?: () => void }) {
// // export function CreateLinkForm({ onCreated }: { onCreated?: () => void }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors },
//   } = useForm<CreateLinkFormData>({
//     resolver: zodResolver(createLinkSchema),
//     defaultValues: {
//       originalUrl: "",
//       shortCode: "",
//     },
//   });

//   const onSubmit = async (data: CreateLinkFormData) => {
//     setIsSubmitting(true);

//     try {
//       await mockCreateLink(data);
//       reset();
//       onCreated?.();
//     } catch (err: any) {
//       if (err?.code === "DUPLICATE") {
//         setError("shortCode", {
//           type: "manual",
//           message: "Esse encurtamento já existe. Tente outro.",
//         });
//       } else {
//         setError("originalUrl", {
//           type: "manual",
//           message: "Falha ao criar o link. Tente novamente.",
//         });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
//       <Input
//         label="Link original"
//         placeholder="https://exemplo.com/minha-pagina"
//         disabled={isSubmitting}
//         error={errors.originalUrl?.message}
//         {...register("originalUrl")}
//       />

//       <Input
//         label="Link encurtado"
//         placeholder="meu-link"
//         disabled={isSubmitting}
//         error={errors.shortCode?.message}
//         {...register("shortCode")}
//       />

//       <Button type="submit" loading={isSubmitting}>
//         Salvar link
//       </Button>
//     </form>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./Input";
import { Button } from "./Button";
import { createLinkSchema, type CreateLinkFormData } from "../lib/validators";
import { createLink } from "../lib/linksApi";

type Props = {
  onCreated?: () => void;
};

export function CreateLinkForm({ onCreated }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: { originalUrl: "", shortCode: "" },
  });

  const onSubmit = async (data: CreateLinkFormData) => {
    setIsSubmitting(true);
    try {
      await createLink(data);
      reset();
      onCreated?.();
    } catch (err: any) {
      if (err?.status === 409 || err?.code === "SHORT_CODE_ALREADY_EXISTS") {
        setError("shortCode", {
          type: "manual",
          message: "Esse encurtamento já existe. Tente outro.",
        });
      } else {
        setError("originalUrl", {
          type: "manual",
          message: "Falha ao criar o link. Tente novamente.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <Input
        label="Link original"
        placeholder="https://exemplo.com/minha-pagina"
        disabled={isSubmitting}
        error={errors.originalUrl?.message}
        {...register("originalUrl")}
      />

      <Input
        label="Link encurtado"
        placeholder="meu-link"
        disabled={isSubmitting}
        error={errors.shortCode?.message}
        {...register("shortCode")}
      />

      <Button type="submit" loading={isSubmitting}>
        Salvar link
      </Button>
    </form>
  );
}