export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex flex-col gap-2 justify-center text-center text-xs">
      <p>
        Hecho con ❤️ por{' '}
        <a
          href="https://www.linkedin.com/in/eanorambuena/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
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
          contáctanos a <span className="text-emerald-700">soporte.idsapp@gmail.com</span>
        </a>
      </p>
    </footer>
  )
}
