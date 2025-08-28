import { QuestionsProvider } from "../contexts/QuestionsContext";
import MediaForm from "../ui/MediaForm";
import Page from "../ui/Page";

function MediaSelection({ questionsType }) {
  return (
    <Page>
      <main className={`overflow-hidden `}>
        <section className="container ">
          {/* <QuestionsProvider> */}
          <MediaForm questionsType={questionsType}></MediaForm>
          {/* </QuestionsProvider> */}
        </section>
      </main>
    </Page>
  );
}

export default MediaSelection;
