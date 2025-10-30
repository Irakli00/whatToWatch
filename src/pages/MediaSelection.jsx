// import { QuestionsProvider } from "../contexts/QuestionsContext";
import Page from "../ui/layout/Page";
import MediaForm from "../ui/elements/MediaForm";

function MediaSelection({ questionsType, type }) {
  return (
    <Page className={"bg-gray-200"}>
      <section className="cusom-container ">
        {/* <QuestionsProvider> */}
        <MediaForm type={type} questionsType={questionsType}></MediaForm>
        {/* </QuestionsProvider> */}
      </section>
    </Page>
  );
}

export default MediaSelection;
