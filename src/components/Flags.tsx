// Bandeiras simplificadas, desenhadas para leitura em tamanho pequeno. São decorativas:
// o nome do idioma vem do conteúdo, no rótulo do switch.

export function BrazilFlag() {
  return (
    <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false">
      <rect width="28" height="20" fill="#009c3b" />
      <path d="M14 2.5 25 10 14 17.5 3 10Z" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4.4" fill="#002776" />
      <path d="M9.8 9.1c2.9-.6 5.9-.1 8.4 1.5" stroke="#fff" strokeWidth="0.9" fill="none" />
    </svg>
  )
}

export function UsaFlag() {
  return (
    <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false">
      <rect width="28" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((stripe) => (
        <rect key={stripe} y={(stripe * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(7 * 20) / 13} fill="#3c3b6e" />
      {[2, 6, 10].map((x) =>
        [2.2, 5.4, 8.6].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill="#fff" />),
      )}
    </svg>
  )
}
