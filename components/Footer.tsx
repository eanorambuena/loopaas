import ManualTranslator from './ManualTranslator'

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex flex-col gap-4 justify-center text-center text-xs">
      {/* Traductor manual - botón flotante */}
      <ManualTranslator />
      
      <div className="flex flex-col gap-2">
        <p>
          Hecho con ❤️ por{' '}
          <a
            href="https://www.linkedin.com/in/eanorambuena/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
            data-translate="no"
          >
            Emmanuel Norambuena
          </a>
        </p>
        <p>
          Si tienes algún problema, por favor{' '}
          <a
            href="mailto:soporte.idsapp@gmail.com"
            className="font-bold hover:underline"
          >
            contáctanos a <span className="text-emerald-700" data-translate="no">soporte.idsapp@gmail.com</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
