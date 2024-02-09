import { type PutBlobResult } from "@vercel/blob";
import { Input } from "./input";
import { upload } from "@vercel/blob/client";
import {
  type ControllerRenderProps,
  type UseFormReturn,
} from "react-hook-form";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { PlusCircle, X } from "lucide-react";
import { Fragment } from "react";
import Loader from "./loader";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const onFilesUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  handleUploadUrl: string,
) => {
  const files = e.target.files;
  if (files) {
    const fileArray = Array.from(files);
    const blobPromises: Promise<PutBlobResult>[] = [];

    for (const file of fileArray) {
      const newBlob = upload(file.name, file, {
        access: "public",
        handleUploadUrl: handleUploadUrl,
      });

      blobPromises.push(newBlob);
    }

    if (blobPromises.length) {
      const blobs = await Promise.all(blobPromises);
      const imageUrls = blobs.map((blob) => blob.url);
      return imageUrls;
    }
  }
};

const validateFiles = (files: File[], maxFiles: number) => {
  if (files?.length > maxFiles) {
    return {
      error: `You can only upload ${maxFiles} more file${
        maxFiles == 1 ? "." : "s."
      }`,
    };
  }

  const isFileTooLarge = files.some((file) => file.size > MAX_FILE_SIZE);
  if (isFileTooLarge) {
    return {
      error: `Files must be smaller than ${MAX_FILE_SIZE / 1000000} MB`,
    };
  }
  const isFileTypeInvalid = !files.every((file) =>
    ACCEPTED_IMAGE_TYPES.includes(file.type),
  );

  if (isFileTypeInvalid) {
    return { error: "File type not supported" };
  }

  return { error: null };
};

export function ImageInput({
  form,
  field,
  maxFiles,
  handleUploadUrl,
}: {
  form: UseFormReturn<any>;
  field: ControllerRenderProps<any, any>;
  maxFiles: number;
  handleUploadUrl: string;
}) {
  return (
    <Fragment>
      {(field.value as string[]).length < maxFiles && (
        <label htmlFor="file-upload">
          <PlusCircle className="brightness- h-14 w-14 cursor-pointer text-gray-300 hover:text-gray-400" />
        </label>
      )}
      <Input
        id="file-upload"
        placeholder="Image"
        type="file"
        accept="image/*"
        className="file:cursor-pointer file:rounded-md file:hover:bg-slate-200"
        multiple
        onChange={async (e) => {
          if (!e.target.files) {
            return;
          }

          const { error } = validateFiles(
            Array.from(e.target.files),
            maxFiles - (field.value as string[]).length,
          );

          if (error) {
            form.setError(field.name, { message: error });
            e.target.value = "";
            return;
          }

          const emptyArray = Array.from(e.target.files).map(() => "");

          field.onChange([...field.value, ...emptyArray]);
          const imageUrls = await onFilesUpload(e, handleUploadUrl);

          if (imageUrls) {
            field.onChange([...field.value, ...imageUrls]);
            form.clearErrors(field.name);
            e.target.value = "";
          } else {
            field.onChange([...field.value]);
          }
        }}
      />
    </Fragment>
  );
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function ImageInputDisplay({
  field,
  className,
}: {
  field: ControllerRenderProps<any, any>;
  className?: string;
}) {
  return field.value && (field.value as unknown as string[]).length > 0 ? (
    <div className="flex flex-row flex-wrap gap-2">
      {(field.value as unknown as string[])?.map((image, idx) => (
        <div key={idx} className={cn("relative h-20 w-20", className)}>
          {image ? (
            <div>
              <Image
                src={image}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
                alt={`image ${idx + 1}`}
              />
              <X
                className="hover: absolute right-1 top-1 cursor-pointer rounded-full bg-slate-300 p-1 text-black opacity-70 hover:opacity-100"
                onClick={() => {
                  const newImages = (field.value as unknown as string[]).filter(
                    (_, index) => index !== idx,
                  );
                  field.onChange(newImages);
                }}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-slate-200">
              <Loader show={true} />
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <span></span>
  );
}
