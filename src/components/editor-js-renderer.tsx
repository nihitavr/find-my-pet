import { type OutputData } from "@editorjs/editorjs";
import parse from "html-react-parser";
import Image from "next/image";

export type EditorJsRenderProps = {
  data: OutputData;
  title?: string;
};

export function EditorJsRender({ data, title }: EditorJsRenderProps) {
  if (!data) return <div></div>;

  const html = data.blocks?.map((block, idx) => {
    const blockClasses = "p-0 text-sm md:text-base";

    switch (block.type) {
      case "paragraph":
        return (
          <div key={idx} className={blockClasses}>
            <p>{parse(block?.data?.text)}</p>
          </div>
        );
      case "header":
        switch (block.data.level) {
          case 2:
            return (
              <div key={idx} className={blockClasses}>
                <h2 className="text-2xl">{parse(block.data.text)}</h2>
              </div>
            );
          case 3:
            return (
              <div key={idx} className={blockClasses}>
                <h3 className="text-xl">{block.data.text}</h3>
              </div>
            );
        }
      case "list":
        switch (block.data.style) {
          case "ordered":
            return (
              <div key={idx} className={blockClasses}>
                <ol className="z-10 flex list-outside list-decimal flex-col gap-1.5 px-8">
                  {block.data.items.map((item: string, idx: number) => {
                    return <li key={idx}>{parse(item)}</li>;
                  })}
                </ol>
              </div>
            );
          case "unordered":
            return (
              <div key={idx} className={blockClasses}>
                <ul className="z-10 flex list-outside list-disc flex-col gap-1.5 px-8">
                  {block.data.items.map((item: string, idx: number) => {
                    return <li key={idx}>{parse(item)}</li>;
                  })}
                </ul>
              </div>
            );
        }
      case "table":
        const heading = block.data.withHeadings ? block.data.content[0] : null;
        const rows = block.data.withHeadings
          ? block.data.content.slice(1)
          : block.data.content;

        return (
          <div key={idx} className={blockClasses}>
            <table className="table w-full">
              {heading && (
                <thead className="border-2">
                  <tr>
                    {heading.map((item: string, idx: number) => {
                      return (
                        <th className="border-2 p-2" key={idx}>
                          {parse(item)}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((row: any, idx: number) => {
                  return (
                    <tr key={idx}>
                      {row.map((item: string, idx: number) => {
                        return (
                          <td className="border-2 p-2 text-center" key={idx}>
                            {parse(item)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      case "image":
        return (
          <div
            key={idx}
            className={`relative aspect-square w-full md:aspect-[3/1] ${blockClasses}`}
          >
            <Image
              fill
              style={{
                objectFit: "contain",
              }}
              src={block.data.file.url}
              alt={block.data.caption}
              className="md:px-52"
            />
          </div>
        );
    }
  });

  return (
    <div className={`text-container flex flex-col rounded-md`}>
      {title && <h1 className="text-xl font-semibold">{title}</h1>}

      {/* Blog Html */}
      <div className="flex flex-col gap-5">{html}</div>
    </div>
  );
}
