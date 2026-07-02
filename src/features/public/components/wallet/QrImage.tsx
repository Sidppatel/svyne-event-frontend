import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export function QrImage({ value, size, className }: { value: string; size: number; className?: string }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, { width: size, margin: 1 })
      .then((url) => active && setDataUrl(url))
      .catch(() => active && setDataUrl(null));
    return () => {
      active = false;
    };
  }, [value, size]);

  if (!dataUrl) {
    return <div style={{ width: size, height: size }} className="animate-pulse rounded bg-hairline" />;
  }
  return <img src={dataUrl} alt="Ticket QR code" width={size} height={size} className={className} />;
}
