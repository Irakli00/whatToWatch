import { QuestionsProvider } from "../contexts/QuestionsContext";
import MediaForm from "../ui/elements/MediaForm";
import Page from "../ui/layout/Page";

function MediaSelection({ questionsType }) {
  return (
    <Page>
      <main className={`overflow-hidden `}>
        <section className="cusom-container ">
          {/* <QuestionsProvider> */}
          <MediaForm questionsType={questionsType}></MediaForm>
          {/* </QuestionsProvider> */}
        </section>
      </main>
    </Page>
  );
}

export default MediaSelection;
