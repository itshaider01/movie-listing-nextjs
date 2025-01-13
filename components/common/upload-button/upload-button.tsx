import React, { ChangeEvent } from "react";
import { Download, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadButtonProps {
  onImageUpload: (file: string | File) => void;
  error?: string;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  imagePreview,
  setImagePreview,
  onImageUpload,
  error,
}) => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview("");
  };

  return (
    <>
      {imagePreview ? (
        <div className="relative">
          <button
            onClick={() => clearImagePreview()}
            className=" z-10 absolute top-0 right-0 bg-black/50"
          >
            <X width={18} height={18} color="#ffffff" />
          </button>
          <Image
            src={imagePreview}
            alt="Uploaded Image Preview"
            className="rounded object-cover z-10 md:w-[473px] h-[372px] md:h-[504px]  "
            width={504}
            height={372}
          />
        </div>
      ) : (
        <div
          id="file-drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("file-upload")?.click()}
          className={`flex flex-col items-center justify-center w-full md:w-[473px] h-[372px] md:h-[504px] ${
            error ? "border-red-500 border-2" : "border-voilet-primary-100"
          } border-2 border-dashed rounded-lg p-14 bg-foreground shadow-md cursor-pointer`}
        >
          <div className="flex flex-col items-center mb-1">
            <Download color="#ffffff" />
          </div>
          <p className="text-sm text-white text-center">Upload an image here</p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={(e) => handleImageUpload(e)}
          />

          {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
        </div>
      )}
    </>
  );
};

export default ImageUploadButton;
