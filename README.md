# I N V O I C E O 

> **Money is just a collective hallucination, but your landlord still demands it. Get paid without the friction.**

An aggressively fast, entirely static invoice generator built with Next.js. No databases, no forced watermarks, and zero tracking. Just a highly functional interface that lets you brand your documents and export them directly from the browser. 

---

## ❖ Core Features

**⬡ Total Brand Control**
↳ Upload your logo, map your primary hex codes, and ensure the output perfectly aligns with your business aesthetic. 

**⬡ Absolute Minimalism**
↳ The UI is built on a simple truth: minimalism isn't about reducing effort; it's about removing confusion. No unnecessary steps between you and the money you are owed.

**⬡ Stateless Architecture**
↳ Everything is calculated and rendered locally in the browser. Your financial data and client information never touch an external server, keeping you entirely off the grid.

**⬡ Statically Exported**
↳ Built as a purely static application. It loads faster than your clients can come up with excuses for late payments.

---

## ⚙ Tech Stack

* **Core:** Next.js
* **Architecture:** Static Site Generation (SSG)
* **Deployment:** Agnostic (Vercel, Netlify, raw Linux servers, etc.)

---

## ⎔ Local Development

Getting the environment running locally takes less than a minute.

**1. Clone the repository**
`bash
https://github.com/Nihal-vh/invoiceo.git
cd invoiceo
`

**2. Install dependencies**
`bash
npm install
`

**3. Boot the development server**
`bash
npm run dev
`
Navigate to `http://localhost:3000` to view the application.

---

## ⏣ Production Build

To generate the static HTML files for deployment, simply run:

`bash
npm run build
`

This creates an `out` directory containing your heavily optimized static assets, ready to be dropped into any standard hosting environment.

---

## ↟ Contributing

Contributions are welcome. Keep the code clean, ensure your pull requests align with the classic design philosophy of the project, and document your changes clearly. 

## § License

MIT License. See the `LICENSE` file for details.
