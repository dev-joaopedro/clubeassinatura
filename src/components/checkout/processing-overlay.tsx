import { motion } from "framer-motion";

export function ProcessingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-coffee-950/95 px-6 text-center backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-cream-50/25 border-t-gold-400" />
      <p className="font-serif text-xl text-cream-50">Processando pagamento…</p>
      <p className="max-w-xs font-sans text-sm text-cream-100/60">
        Estamos confirmando sua assinatura demonstrativa. Isso leva só alguns segundos.
      </p>
    </motion.div>
  );
}
