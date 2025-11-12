import PageContainer from "../../componentes/Container/PageContainer";

function Sobre() {
  return (
    <PageContainer>
    <section className="min-h-screen bg-orange-200 py-12 px-6 flex flex-col items-center">
      <div className="max-w-3xl bg-white p-10 rounded-2xl shadow-xl space-y-8">
        <h1 className="text-4xl font-bold text-orange-700 text-center">
          Sobre o PausaProGato 🐱
        </h1>

        <p className="text-orange-700 leading-relaxed text-lg">
          O <strong>PausaProGato</strong> nasceu com o propósito de trazer leveza,
          autocuidado e bem-estar para o dia a dia de quem vive a rotina intensa do trabalho.
          Acreditamos que pequenas pausas podem transformar o humor e a produtividade —
          e nada melhor do que um toque de fofura que gatinhos podem nos trazer para isso! 
        </p>

        <p className="text-orange-700 leading-relaxed text-lg">
          A plataforma permite que os usuários façam um <strong>check-in emocional</strong>,
          registrem seu humor do dia e acessem <strong>recursos de apoio</strong> para momentos
          de cansaço, ansiedade ou estresse. É um espaço gentil para cuidar da mente,
          inspirado em pesquisas sobre saúde mental no ambiente de trabalho.
        </p>

        <p className="text-orange-700 leading-relaxed text-lg">
          o PausaProGato foi criado para lembrar que <em>pausar também é um ato de coragem</em>.
        </p>

        <div className="text-center text-orange-600 font-medium mt-8">
          <p>Cuide de si como cuidaria de um gatinho: com carinho e paciência.</p>
        </div>
      </div>
    </section>
    </PageContainer>
  );
}
export default Sobre;
