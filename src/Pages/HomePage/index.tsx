
import Footer from "../../_component/ui/footer";
import ProductHero from '../../_component/ui/productHero';
import AppAppBar from '../../_component/ui/AppBar';
import Plans from '../../_component/ui/Plans';
import ReceiveOffers from '../../_component/ui/ReceiveOffers';
import PlansDetails from '../../_component/ui/plansDetails';
// import PlansNew from "../../_component/ui/plan";

const HomePage = () => {

  return (
    <div>
      <AppAppBar />
      <ProductHero />
      <Plans />
      {/* <PlansNew /> */}
      <PlansDetails />
      <ReceiveOffers />
      <Footer />
      
    </div>
  );
};

export default HomePage;