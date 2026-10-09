'use client';
export default function Error({reset}:{reset:()=>void}){return <main className="portal-loading"><h1>Something didn’t load correctly.</h1><p>Please try again.</p><button onClick={reset}>Try again</button></main>}
