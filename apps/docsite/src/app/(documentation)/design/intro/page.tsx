import DocsSlugPage from '../../[...slug]/page';

const DesignIntroPage = () => <DocsSlugPage params={Promise.resolve({ slug: ['design'] })} />;

export default DesignIntroPage;
