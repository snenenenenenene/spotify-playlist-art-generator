// components/Footer.tsx
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer className="footer pt-20 border-t border-neutral-200 dark:border-neutral-800 font-satoshi">
			<div className="container mx-auto px-6">
				<div className="divider border-t border-neutral-200 dark:border-neutral-800"></div>
				<div className="footer-row flex flex-col md:flex-row justify-between items-center py-8">
					<div className="footer-2-left text-neutral-600 dark:text-neutral-400 text-sm mb-4 md:mb-0">
						© 2024 <a
							href="https://sennebels.xyz"
							target="_blank"
							rel="noopener noreferrer"
							className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
						>Senne Bels</a>
					</div>

					<div className="footer-2-right">
						<ul className="social-icons-list flex space-x-4 items-center">
							<li className="list-item">
								<a
									href="https://github.com/snenenenenenene"
									target="_blank"
									rel="noopener noreferrer"
									className="footersocialicons w-8 h-8 flex items-center justify-center hover:opacity-75 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
								>
									<Github size={20} />
								</a>
							</li>
							<li className="list-item">
								<a
									href="https://linkedin.com/in/sennebels"
									target="_blank"
									rel="noopener noreferrer"
									className="footersocialicons w-8 h-8 flex items-center justify-center hover:opacity-75 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
								>
									<Linkedin size={20} />
								</a>
							</li>
							<li className="list-item">
								<a
									href="mailto:sennebels@gmail.com"
									target="_blank"
									rel="noopener noreferrer"
									className="footersocialicons w-8 h-8 flex items-center justify-center hover:opacity-75 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
								>
									<Mail size={20} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}