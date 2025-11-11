function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-200 rounded-2xl px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="sm:text-[2.75rem] text-[3rem] font-extrabold text-orange-800 leading-tight">
            Bem-vindo ao <span className="text-orange-400">PausaProGato</span>
          </h1>
          <p className="text-[1.125rem] text-orange-700 leading-relaxed">
            O <span className="font-semibold">PausaProGato</span> é 
          </p>
          <p className="text-[1.125rem] text-orange-700 leading-relaxed">
            Tudo pensado para tornar sua experiência fácil, segura e eficiente.
          </p>
        </div>

        <div className="flex justify-center">
        </div>
      </div>
    </section>
  );
}

export default Home;