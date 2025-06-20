import Image from "next/image";

interface RoundedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}

export function RoundedImage({
	src,
	alt,
	width = 600,
	height = 400,
	className = "",
}: RoundedImageProps) {
	return (
		<div className="my-8 overflow-hidden rounded-xl bg-gray-900/50 p-1">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				className={`w-full h-auto rounded-lg ${className}`}
				style={{ objectFit: "cover" }}
			/>
		</div>
	);
}
