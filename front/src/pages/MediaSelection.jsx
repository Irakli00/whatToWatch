import { QuestionsProvider } from "../contexts/QuestionsContext";
import MediaForm from "../ui/MediaForm";

function MediaSelection({ questionsType }) {
  return (
    <main className={`overflow-hidden `}>
      <section className="container ">
        {/* <QuestionsProvider> */}
        <MediaForm questionsType={questionsType}></MediaForm>
        {/* </QuestionsProvider> */}
      </section>
    </main>
  );
}

export default MediaSelection;
