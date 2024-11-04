"use client"
// components/SpotifyArtGenerator.tsx
import React, { useState, useRef, useCallback } from 'react';
import {
	Upload,
	Image as ImageIcon,
	Plus,
	Minus,
	Download,
	ChevronDown,
	Menu,
	Palette,
	Type,
	RotateCw,
	Trash2,
	Settings,
	ArrowLeft,
	Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Position {
	x: number;
	y: number;
}

interface TextLayer {
	id: string;
	text: string;
	position: Position;
	fontSize: number;
	fontFamily: string;
	color: string;
	rotation: number;
}

const DEFAULT_FONTS = [
	'Inter',
	'SF Pro Display',
	'Helvetica Now',
	'Montserrat',
	'Playfair Display',
	'DM Sans',
	'Roboto',
	'Open Sans',
	'Dancing Script',
	'Bebas Neue',
];

const COLORS = [
	'#000000', '#FFFFFF', '#F87171', '#34D399', '#60A5FA',
	'#A78BFA', '#F472B6', '#FBBF24', '#6B7280', '#FB923C'
];

const SpotifyArtGenerator: React.FC = () => {
	const [background, setBackground] = useState<string | null>(null);
	const [backgroundColor, setBackgroundColor] = useState<string>('#000000');
	const [textLayers, setTextLayers] = useState<TextLayer[]>([{
		id: '1',
		text: 'My Playlist',
		position: { x: 50, y: 50 },
		fontSize: 48,
		fontFamily: 'Inter',
		color: '#ffffff',
		rotation: 0
	}]);
	const [selectedLayerId, setSelectedLayerId] = useState<string>('1');
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [brightness, setBrightness] = useState<number>(100);
	const [contrast, setContrast] = useState<number>(100);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	const canvasRef = useRef<HTMLDivElement>(null);

	const selectedLayer = textLayers.find(layer => layer.id === selectedLayerId);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => setBackground(e.target?.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleMouseDown = (e: React.MouseEvent, layerId: string) => {
		e.stopPropagation();
		setSelectedLayerId(layerId);
		setIsDragging(true);
	};

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (isDragging && canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;

			setTextLayers(prev => prev.map(layer =>
				layer.id === selectedLayerId
					? { ...layer, position: { x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) } }
					: layer
			));
		}
	}, [isDragging, selectedLayerId]);

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const addNewTextLayer = () => {
		const newLayer: TextLayer = {
			id: String(textLayers.length + 1),
			text: 'New Text',
			position: { x: 50, y: 50 },
			fontSize: 32,
			fontFamily: 'Inter',
			color: '#ffffff',
			rotation: 0
		};
		setTextLayers(prev => [...prev, newLayer]);
		setSelectedLayerId(newLayer.id);
	};

	const removeSelectedLayer = () => {
		if (textLayers.length > 1) {
			setTextLayers(prev => prev.filter(layer => layer.id !== selectedLayerId));
			setSelectedLayerId(textLayers[0].id);
		}
	};

	const updateSelectedLayer = (updates: Partial<TextLayer>) => {
		setTextLayers(prev => prev.map(layer =>
			layer.id === selectedLayerId ? { ...layer, ...updates } : layer
		));
	};

	const downloadImage = () => {
		const canvas = document.createElement('canvas');
		canvas.width = 1000;
		canvas.height = 1000;
		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		// Draw background color
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw background image if exists
		if (background) {
			const img = new Image();
			img.src = background;
			img.onload = () => {
				ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				ctx.filter = 'none';

				// Draw text layers
				drawTextLayers();
			};
		} else {
			drawTextLayers();
		}

		function drawTextLayers() {
			textLayers.forEach(layer => {
				ctx.save();
				ctx.font = `${layer.fontSize * 2}px ${layer.fontFamily}`;
				ctx.fillStyle = layer.color;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				const centerX = (layer.position.x / 100) * canvas.width;
				const centerY = (layer.position.y / 100) * canvas.height;
				ctx.translate(centerX, centerY);
				ctx.rotate((layer.rotation * Math.PI) / 180);
				ctx.fillText(layer.text, 0, 0);
				ctx.restore();
			});

			const link = document.createElement('a');
			link.download = 'spotify-cover.png';
			link.href = canvas.toDataURL('image/png');
			link.click();
		}
	};

	return (
		<div className="h-screen flex flex-col bg-white">
			{/* Notion-style Header */}
			<header className="flex items-center px-4 h-12 border-b border-neutral-200 gap-2 flex-shrink-0 bg-white">
				<button
					className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					<Menu className="w-4 h-4 text-neutral-600" />
				</button>
				<div className="flex items-center gap-2 px-2 py-1.5 hover:bg-neutral-100 rounded-md cursor-pointer transition-colors">
					<div className="w-4 h-4 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-sm" />
					<span className="text-sm text-neutral-800">Spotify Cover Art</span>
					<ChevronDown className="w-3 h-3 text-neutral-500" />
				</div>
				<div className="h-4 w-px bg-neutral-200 mx-2" />
				<button
					className="ml-auto px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2"
					onClick={downloadImage}
				>
					<Download className="w-4 h-4" />
					Export
				</button>
			</header>

			<div className="flex-1 flex">
				{/* Sidebar */}
				{isSidebarOpen && (
					<div className="w-80 border-r border-neutral-200 flex flex-col bg-white flex-shrink-0">
						<div className="p-3 border-b border-neutral-200">
							<div className="flex items-center gap-2 text-sm text-neutral-600">
								<Settings className="w-4 h-4" />
								Properties
							</div>
						</div>
						<div className="flex-1 overflow-y-auto">
							<div className="p-4 space-y-8">
								{/* Background Section */}
								<section className="space-y-4">
									<div className="flex items-center gap-2 text-sm text-neutral-800 font-medium">
										<Palette className="w-4 h-4" />
										Background
									</div>
									<div className="space-y-4">
										<button
											onClick={() => document.getElementById('imageUpload')?.click()}
											className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors text-sm text-neutral-600"
										>
											<Upload className="w-4 h-4" />
											Upload Image
										</button>
										<input
											id="imageUpload"
											type="file"
											accept="image/*"
											onChange={handleImageUpload}
											className="hidden"
										/>
										{background && (
											<div className="space-y-3">
												<div>
													<label className="block text-xs text-neutral-500 mb-2">
														Brightness
													</label>
													<input
														type="range"
														min="0"
														max="200"
														value={brightness}
														onChange={(e) => setBrightness(Number(e.target.value))}
														className="w-full"
													/>
												</div>
												<div>
													<label className="block text-xs text-neutral-500 mb-2">
														Contrast
													</label>
													<input
														type="range"
														min="0"
														max="200"
														value={contrast}
														onChange={(e) => setContrast(Number(e.target.value))}
														className="w-full"
													/>
												</div>
											</div>
										)}
										<div>
											<label className="block text-xs text-neutral-500 mb-2">
												Background Color
											</label>
											<div className="grid grid-cols-5 gap-2">
												{COLORS.map((color) => (
													<button
														key={color}
														className={cn(
															"w-full aspect-square rounded-md border-2 transition-all",
															backgroundColor === color
																? "border-purple-600 scale-110"
																: "border-transparent hover:scale-105"
														)}
														style={{ backgroundColor: color }}
														onClick={() => setBackgroundColor(color)}
													/>
												))}
											</div>
										</div>
									</div>
								</section>

								{/* Text Layers Section */}
								<section className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 text-sm text-neutral-800 font-medium">
											<Type className="w-4 h-4" />
											Text Layers
										</div>
										<button
											onClick={addNewTextLayer}
											className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"
										>
											<Plus className="w-4 h-4 text-neutral-600" />
										</button>
									</div>
									<div className="space-y-2">
										{textLayers.map((layer) => (
											<div
												key={layer.id}
												className={cn(
													"px-3 py-2 rounded-md cursor-pointer transition-colors",
													selectedLayerId === layer.id
														? "bg-purple-50 text-purple-700"
														: "hover:bg-neutral-50 text-neutral-700"
												)}
												onClick={() => setSelectedLayerId(layer.id)}
											>
												<div className="flex items-center justify-between">
													<span className="text-sm font-medium truncate">
														{layer.text || 'Untitled'}
													</span>
													{selectedLayerId === layer.id && textLayers.length > 1 && (
														<button
															onClick={removeSelectedLayer}
															className="p-1 hover:bg-purple-100 rounded-md"
														>
															<Trash2 className="w-4 h-4" />
														</button>
													)}
												</div>
											</div>
										))}
									</div>
								</section>

								{/* Selected Layer Properties */}
								{selectedLayer && (
									<section className="space-y-4">
										<div className="flex items-center gap-2 text-sm text-neutral-800 font-medium">
											<Settings className="w-4 h-4" />
											Layer Properties
										</div>
										<div className="space-y-4">
											<div>
												<label className="block text-xs text-neutral-500 mb-2">
													Text
												</label>
												<input
													type="text"
													value={selectedLayer.text}
													onChange={(e) => updateSelectedLayer({ text: e.target.value })}
													className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
												/>
											</div>
											<div>
												<label className="block text-xs text-neutral-500 mb-2">
													Font Family
												</label>
												<select
													value={selectedLayer.fontFamily}
													onChange={(e) => updateSelectedLayer({ fontFamily: e.target.value })}
													className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
												>
													{DEFAULT_FONTS.map((font) => (
														<option key={font} value={font} style={{ fontFamily: font }}>
															{font}
														</option>
													))}
												</select>
											</div>
											<div>
												<label className="block text-xs text-neutral-500 mb-2">
													Font Size
												</label>
												<input
													type="range"
													min="12"
													max="120"
													value={selectedLayer.fontSize}
													onChange={(e) => updateSelectedLayer({ fontSize: Number(e.target.value) })}
													className="w-full"
												/>
											</div>
											<div>
												<label className="block text-xs text-neutral-500 mb-2">
													Color
												</label>
												<div className="grid grid-cols-5 gap-2">
													{COLORS.map((color) => (
														<button
															key={color}
															className={cn(
																"w-full aspect-square rounded-md border-2 transition-all",
																selectedLayer.color === color
																	? "border-purple-600 scale-110"
																	: "border-transparent hover:scale-105"
															)}
															style={{ backgroundColor: color }}
															onClick={() => updateSelectedLayer({ color })}
														/>
													))}
												</div>
											</div>
											<div>
												<label className="block text-xs text-neutral-500 mb-2">
													Rotation
												</label>
												<div className="flex items-center gap-4">
													<input
														type="range"
														min="-180"
														max="180"
														value={selectedLayer.rotation}
														onChange={(e) => updateSelectedLayer({ rotation: Number(e.target.value) })}
														className="flex-1"
													/>
													<div className="flex items-center gap-2">
														<button
															onClick={() => updateSelectedLayer({ rotation: 0 })}
															className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"
														>
															<RotateCw className="w-4 h-4 text-neutral-600" />
														</button>
														<span className="text-sm text-neutral-600 min-w-[3rem]">
															{selectedLayer.rotation}°
														</span>
													</div>
												</div>
											</div>
										</div>
									</section>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Canvas Area */}
				<div className="flex-1 bg-neutral-50 p-8 overflow-auto">
					<div className="max-w-3xl mx-auto">
						<div className="mb-4 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Eye className="w-4 h-4 text-neutral-600" />
								<span className="text-sm text-neutral-600">Preview</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-xs text-neutral-500">1000 x 1000px</span>
							</div>
						</div>
						<div
							ref={canvasRef}
							className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
							style={{ backgroundColor }}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
							onMouseLeave={handleMouseUp}
						>
							{background && (
								<img
									src={background}
									alt="Background"
									className="absolute inset-0 w-full h-full object-cover"
									style={{
										filter: `brightness(${brightness}%) contrast(${contrast}%)`
									}}
								/>
							)}
							{textLayers.map((layer) => (
								<div
									key={layer.id}
									className={cn(
										"absolute inline-block transform -translate-x-1/2 -translate-y-1/2 cursor-move",
										layer.id === selectedLayerId && !isDragging && "ring-2 ring-purple-500 ring-offset-2"
									)}
									style={{
										left: `${layer.position.x}%`,
										top: `${layer.position.y}%`,
										fontSize: `${layer.fontSize}px`,
										fontFamily: layer.fontFamily,
										color: layer.color,
										transform: `translate(-50%, -50%) rotate(${layer.rotation}deg)`,
									}}
									onMouseDown={(e) => handleMouseDown(e, layer.id)}
								>
									{layer.text}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpotifyArtGenerator;