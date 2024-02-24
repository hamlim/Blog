import NotebookPage from 'app/notebook/NotebookPage';
import Content from './content.mdx';

export default function Page() {
  return (
    // @ts-expect-error - RSC
    <NotebookPage
      meta={{
        slug: 'the-art-of-note-taking',
        year: '2020',
        month: 'june',
      }}
    >
      <Content />
    </NotebookPage>
  );
}
