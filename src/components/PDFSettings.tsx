import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";

export type PageSize = "A4" | "Letter" | "Legal";
export type Orientation = "portrait" | "landscape";

interface PDFSettingsProps {
  pageSize: PageSize;
  orientation: Orientation;
  onPageSizeChange: (size: PageSize) => void;
  onOrientationChange: (orientation: Orientation) => void;
}

const PDFSettings = ({
  pageSize,
  orientation,
  onPageSizeChange,
  onOrientationChange,
}: PDFSettingsProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">PDF Settings</h3>
      
      <div className="space-y-6">
        {/* Page Size */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Page Size</Label>
          <RadioGroup
            value={pageSize}
            onValueChange={(value) => onPageSizeChange(value as PageSize)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="A4" id="a4" />
              <Label htmlFor="a4" className="cursor-pointer font-normal">
                A4 (210 × 297mm)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Letter" id="letter" />
              <Label htmlFor="letter" className="cursor-pointer font-normal">
                Letter (8.5 × 11")
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Legal" id="legal" />
              <Label htmlFor="legal" className="cursor-pointer font-normal">
                Legal (8.5 × 14")
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Orientation */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Orientation</Label>
          <RadioGroup
            value={orientation}
            onValueChange={(value) => onOrientationChange(value as Orientation)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="portrait" id="portrait" />
              <Label htmlFor="portrait" className="cursor-pointer font-normal">
                Portrait
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="landscape" id="landscape" />
              <Label htmlFor="landscape" className="cursor-pointer font-normal">
                Landscape
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};

export default PDFSettings;
