export default function Home() {
  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <section className="min-h-screen bg-orange-100 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-orange-700 mb-4">
        Bem-vindo/a ao PausaProGato, {user.username || "visitante"}! 🐾
      </h1>
      {user.avatar && (
        <img
          src={`/img/${user.avatar.replace(/\s+/g, '').toLowerCase()}.png`}
          alt={user.avatar}
          className="w-40 h-40 rounded-full shadow-lg ring-4 ring-orange-400 p-1"
        />
      )}
      <p className="mt-6 text-orange-700 max-w-lg">
        Aqui é onde você poderá explorar tudo o que o PausaProGato oferece!
      </p>
    </section>
  );
}
