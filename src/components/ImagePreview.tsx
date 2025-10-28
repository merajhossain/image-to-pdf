import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ImageFile } from "./ImageGallery";

interface ImagePreviewProps {
  image: ImageFile;
  index: number;
  onRemove: (id: string) => void;
}

const ImagePreview = ({ image, index, onRemove }: ImagePreviewProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group rounded-xl overflow-hidden bg-card border border-border",
        "transition-all duration-200 hover:shadow-lg",
        isDragging && "opacity-50 z-50 scale-105 shadow-2xl"
      )}
    >
      <div className="aspect-square relative">
        <img
          src={image.preview}
          alt={`Upload ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 p-1.5 bg-background/90 backdrop-blur-sm rounded-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Remove Button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={() => onRemove(image.id)}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Image Number */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-md text-xs font-medium">
          #{index + 1}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
