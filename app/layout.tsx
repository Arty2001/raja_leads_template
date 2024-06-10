import { Providers } from './providers';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollSnapType: 'y mandatory' }}>
      <body style={{margin: 0, padding: 0}}>
          <Providers>{children}</Providers>
        </body>
    </html>
  )
}
