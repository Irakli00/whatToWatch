import { QuestionsProvider } from "../contexts/QuestionsContext";
import MediaForm from "../ui/MediaForm";

function MediaSelection({ questionsType }) {
  return (
    <section className="container ">
      <QuestionsProvider>
        <MediaForm questionsType={questionsType}></MediaForm>
      </QuestionsProvider>
    </section>
  );
}

export default MediaSelection;
