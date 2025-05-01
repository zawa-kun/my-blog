import { BlogMetadataProps } from "@/types/type";


export default function BlogMetadata({ title, date, tags }: BlogMetadataProps) {
  return (
    <div className="mb-8">
      {tags && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}

      {date && (
        <time className="text-gray-500" dateTime={date}>
          {new Date(date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      )}
    </div>
  );
}
