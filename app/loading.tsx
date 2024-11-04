// app/loading.tsx
export default function Loading() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
			<div className="container mx-auto py-8">
				<div className="space-y-6">
					<header className="text-center space-y-4">
						<div className="h-8 w-64 bg-gray-800 rounded-lg animate-pulse mx-auto" />
						<div className="h-4 w-96 bg-gray-800 rounded animate-pulse mx-auto" />
					</header>

					<div className="max-w-6xl mx-auto p-4">
						<div className="bg-gray-800/50 rounded-xl p-6 space-y-8 animate-pulse">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<div className="aspect-square bg-gray-800 rounded-lg" />
								</div>
								<div className="space-y-4">
									{[1, 2, 3, 4].map((i) => (
										<div key={i} className="h-10 bg-gray-800 rounded" />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}