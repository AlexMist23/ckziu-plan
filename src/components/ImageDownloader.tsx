"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

export default function ImageDownloader() {
  const [baseUrl, setBaseUrl] = useState("");
  const [imageCount, setImageCount] = useState(10);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const downloadImages = async () => {
    setIsDownloading(true);
    setProgress(0);
    const downloadedImages: string[] = [];
    for (let i = 1; i <= imageCount; i++) {
      try {
        const imageUrl = `${baseUrl}/files/mobile/${i}.jpg`;
        const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image ${i}`);
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        downloadedImages.push(url);
        setProgress(() => (i / imageCount) * 100);
      } catch (error) {
        console.error(`Error downloading image ${i}:`, error);
        toast({
          title: "Error",
          description: `Failed to download image ${i}. Please try again.`,
          variant: "destructive",
        });
      }
    }
    setImages(downloadedImages);
    setIsDownloading(false);
    toast({
      title: "Success",
      description: `Downloaded ${imageCount} images successfully.`,
    });
  };

  const createPDF = async () => {
    const pdf = new jsPDF();
    for (let i = 0; i < images.length; i++) {
      const img = new Image();
      img.src = images[i];
      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          const imgData = canvas.toDataURL("image/jpeg");
          if (i > 0) pdf.addPage();
          pdf.addImage(
            imgData,
            "JPEG",
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight()
          );
          resolve(null);
        };
      });
    }
    pdf.save("images.pdf");
  };

  const downloadFirstImage = async () => {
    try {
      const imageUrl = `${baseUrl}/files/mobile/1.jpg`;
      const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch the first image`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image_1.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast({
        title: "Success",
        description: `Downloaded the first image successfully.`,
      });
    } catch (error) {
      console.error(`Error downloading the first image:`, error);
      toast({
        title: "Error",
        description: `Failed to download the first image. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Label htmlFor="base-url">Base URL</Label>
      <Input
        id="base-url"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        placeholder="Enter base URL"
      />
      <Label htmlFor="image-count">Number of Pages</Label>
      <Input
        id="image-count"
        type="number"
        value={imageCount}
        onChange={(e) => setImageCount(parseInt(e.target.value))}
        min="1"
      />
      <Button onClick={downloadImages} disabled={isDownloading}>
        {isDownloading ? "Downloading..." : "Download Images"}
      </Button>
      {isDownloading && <Progress value={progress} />}
      {images.length > 0 && <Button onClick={createPDF}>Create PDF</Button>}
      <Button onClick={downloadFirstImage}>Download First Image</Button>
    </div>
  );
}
