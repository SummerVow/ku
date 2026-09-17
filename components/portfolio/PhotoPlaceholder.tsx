import { Plus } from "lucide-react";
export default function PhotoPlaceholder({
  label,
  index = "01",
  image = "",
  alt = "",
}: {
  label: string;
  index?: string;
  image?: string;
  alt?: string;
}) {
  return image ? (
    <img
      className="archive-photo"
      src={image}
      alt={alt || label}
      loading="lazy"
      width="800"
      height="500"
    />
  ) : (
    <div className="photo-placeholder">
      <span className="photo-corner top-left" />
      <span className="photo-corner bottom-right" />
      <Plus size={22} strokeWidth={0.7} />
      <span>{label}</span>
      <small>PHOTO ARCHIVE / {index}</small>
    </div>
  );
}
