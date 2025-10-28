import { useState, useCallback } from "react";
import { Download, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import ImageGallery, { ImageFile } from "@/components/ImageGallery";
import PDFSettings, { PageSize, Orientation } from "@/components/PDFSettings";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

const Index = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFilesAdded = useCallback((files: File[]) => {
    const newImages: ImageFile[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    toast.success(`Added ${files.length} image${files.length > 1 ? "s" : ""}`);
  }, []);

  const handleReorder = useCallback((reorderedImages: ImageFile[]) => {
    setImages(reorderedImages);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
    toast.success("Image removed");
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach((image) => URL.revokeObjectURL(image.preview));
    setImages([]);
    toast.success("All images cleared");
  }, [images]);

  const handleGeneratePDF = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsGenerating(true);
    try {
      const pdfBlob = await generatePDF(
        images.map((img) => img.file),
        pageSize,
        orientation
      );

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `merged-images-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Upload Zone */}
        <section>
          <UploadZone onFilesAdded={handleFilesAdded} hasImages={images.length > 0} />
        </section>

        {/* Image Gallery */}
        {images.length > 0 && (
          <section className="space-y-6">
            <ImageGallery
              images={images}
              onReorder={handleReorder}
              onRemove={handleRemove}
            />

            {/* Settings */}
            <PDFSettings
              pageSize={pageSize}
              orientation={orientation}
              onPageSizeChange={setPageSize}
              onOrientationChange={setOrientation}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg font-semibold py-6"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download as PDF
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleClearAll}
                variant="outline"
                size="lg"
                className="sm:w-auto py-6"
                disabled={isGenerating}
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Clear All
              </Button>
            </div>
          </section>
        )}

        {/* Empty State Info */}
        {images.length === 0 && (
          <section className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-bold">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Upload Images</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload multiple images
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Arrange & Configure</h3>
                <p className="text-sm text-muted-foreground">
                  Reorder images and choose your PDF settings
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Download PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Generate and download your merged PDF file
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border bg-card text-center text-sm text-muted-foreground">
        <p>© 2025 Image2PDF Merge. All images are processed locally in your browser.</p>
      </footer>
    </div>
  );
};

export default Index;
