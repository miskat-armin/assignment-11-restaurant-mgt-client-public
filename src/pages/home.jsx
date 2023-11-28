import Banner from "../components/Banner/banner";
import CustomerReviews from "../components/Review/reviews";
import TopOrderedItems from "../components/TopItems/topMostItems";
import Features from "../components/feature/feature";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Home");
  return (
    <div>
      <Banner />
      <TopOrderedItems />
      <CustomerReviews />
      <Features />
    </div>
  );
};
export default Home;
