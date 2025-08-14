import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import React from 'react'

interface UpgradeModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onGoToPricing: () => void
	onClose: () => void
}

export default function UpgradeModal({ open, onOpenChange, onGoToPricing, onClose }: UpgradeModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-gradient-to-br from-purple-700 via-emerald-700 to-blue-700 text-white border-4 border-emerald-400/30 shadow-2xl p-8 animate-in fade-in duration-500">
				<DialogHeader>
					<div className="flex flex-col items-center justify-center">
						<div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-3 shadow-lg mb-2">
							<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 drop-shadow-lg">
								<path d="M12 2l2.09 6.26L20 9.27l-5 4.87L16.18 21 12 17.77 7.82 21 9 14.14l-5-4.87 5.91-.91z" />
							</svg>
						</div>
						<DialogTitle className="text-2xl font-extrabold mb-3 text-center text-white drop-shadow-lg mt-2">¡Desbloquea el poder de Pro!</DialogTitle>
						<DialogDescription className="mb-4 text-center text-lg text-emerald-100 opacity-90 font-medium">
							Has alcanzado el límite de cursos para el plan <span className="font-bold text-yellow-300">Free</span>. Actualiza a <span className="font-bold text-emerald-300">Pro</span> y accede a cursos ilimitados, plugins premium y soporte prioritario.
						</DialogDescription>
					</div>
				</DialogHeader>
				<ul className="mb-6 text-left text-white/90 text-base space-y-2 w-full max-w-xs mx-auto">
					<li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span> Cursos ilimitados</li>
					<li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span> Plugins premium</li>
					<li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-yellow-300"></span> Soporte prioritario</li>
				</ul>
				<DialogFooter>
					<button
						className="w-full py-3 mb-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-200"
						onClick={onGoToPricing}
					>Ver planes Pro</button>
					<button
						className="text-sm text-emerald-200 hover:underline mt-2"
						onClick={onClose}
					>Cerrar</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
