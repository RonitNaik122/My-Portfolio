import "./globals.css"

export const metadata = {
  title: "Ronit Naik",
  description: "Portfolio of Ronit Naik, a software engineer specializing in web development.",
  keywords: "Ronit Naik, software engineer, web developer, portfolio, projects, skills",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


import './globals.css'