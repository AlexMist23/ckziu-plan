import ImageDownloader from "@/components/ImageDownloader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageDownloaderPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Flipbook Downloader</CardTitle>
        </CardHeader>

        <ImageDownloader />
      </Card>
    </div>
  );
}
