import { FileImage } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <FileImage className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Image2PDF Merge
        </h1>
      </div>
    </header>
  );
};

export default Header;
