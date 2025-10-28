import { PDFDocument } from "pdf-lib";
import { PageSize, Orientation } from "@/components/PDFSettings";

// Page dimensions in points (1 inch = 72 points)
const PAGE_DIMENSIONS = {
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
};

export const generatePDF = async (
  imageFiles: File[],
  pageSize: PageSize,
  orientation: Orientation
): Promise<Blob> => {
  const pdfDoc = await PDFDocument.create();
  
  // Get page dimensions
  let { width, height } = PAGE_DIMENSIONS[pageSize];
  
  // Swap dimensions for landscape
  if (orientation === "landscape") {
    [width, height] = [height, width];
  }

  // Process each image
  for (const imageFile of imageFiles) {
    const imageBytes = await imageFile.arrayBuffer();
    let image;

    // Embed image based on type
    if (imageFile.type === "image/png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      // Default to JPEG for other types
      image = await pdfDoc.embedJpg(imageBytes);
    }

    // Calculate scaling to fit the page while maintaining aspect ratio
    const imgWidth = image.width;
    const imgHeight = image.height;
    const imgAspectRatio = imgWidth / imgHeight;
    const pageAspectRatio = width / height;

    let scaledWidth: number;
    let scaledHeight: number;

    if (imgAspectRatio > pageAspectRatio) {
      // Image is wider than page
      scaledWidth = width;
      scaledHeight = width / imgAspectRatio;
    } else {
      // Image is taller than page
      scaledHeight = height;
      scaledWidth = height * imgAspectRatio;
    }

    // Center the image on the page
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;

    // Add a new page and draw the image
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  
  // Return as Blob
  return new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
};
