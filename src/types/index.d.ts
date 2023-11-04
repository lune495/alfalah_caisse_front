export {};

declare global {
  interface Window {
    io: any; // 👈️ turn off type checking
    Echo: any; // 👈️ turn off type checking
  }
  interface Io {
    connect: any; // 👈️ turn off type checking
  }
}