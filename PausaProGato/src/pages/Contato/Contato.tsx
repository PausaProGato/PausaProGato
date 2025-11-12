function Contato() {
  const contato = [
    {
      nome: "Agatha Yie Won Yun",
      rm: "RM:561507",
      turma: "1TDSA",
      foto: "/img/icon_aywy.jpeg",
      github: "https://github.com/agathayun",
      linkedin: "https://www.linkedin.com/in/agatha-yun-75334535b/",
    },
    {
      nome: "Ana Claudia Fernandes Martins",
      rm: "RM:561190",
      turma: "1TDSA",
      foto: "/img/icon_anac.jpeg",
      github: "https://github.com/AnaCFmartins",
      linkedin: "https://www.linkedin.com/in/ana-claudia-fernandes-martins/",
    },
    {
      nome: "Samantha Faruolo Galdi",
      rm: "RM:554794",
      turma: "1TDSA",
      foto: "/img/icon_smf.jpeg",
      github: "https://github.com/samyfg41",
      linkedin: "https://www.linkedin.com/in/samantha-faruolo-galdi-534422301/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-orange-200 rounded-2xl">
      <br />
      <h1 className="text-[2.25rem] font-bold mb-8 text-orange-700">Integrantes</h1>

      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
        {contato.map((pessoa, index) => (
          <div
            key={index}
            className="bg-orange-50 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={pessoa.foto}
              alt={pessoa.nome}
              className="w-45 h-45 rounded-full object-cover shadow-md mb-4"
            />
            <h3 className="text-[1.25rem] font-semibold text-orange-700">{pessoa.nome}</h3>
            <p className="text-orange-600">{pessoa.rm}</p>
            <p className="text-orange-600 mb-4">Turma: {pessoa.turma}</p>
            <div className="flex gap-4">
              <a
                href={pessoa.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-black"
              >
                <img src="/img/github.png" alt="GitHub" className="w-8 h-8" />
                Github
              </a>
              <a
                href={pessoa.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
              >
                <img src="/img/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
                Linkedin
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contato;