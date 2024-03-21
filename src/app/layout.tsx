import type { Metadata } from 'next'
import { karla } from './fonts'
import './globals.css'
import NavBar from './components/NavBar'


export const metadata: Metadata = {
  title: 'Little Lemon | Reserve Table',
  description: 'Coursera Front End Web Dev Final',
  icons: {
    icon: [
     { url: '/icon.ico'},
    ],
  },

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
