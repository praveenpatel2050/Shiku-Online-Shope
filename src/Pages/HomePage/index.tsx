
import Footer from "../../_component/ui/footer";
import ProductHero from '../../_component/ui/productHero';
import AppAppBar from '../../_component/ui/AppBar';
import Plans from '../../_component/ui/Plans';
import ReceiveOffers from '../../_component/ui/ReceiveOffers';
import InformationVideo from '../../_component/ui/Informaation';
import PlansDetails from '../../_component/ui/plansDetails';

const HomePage = () => {

  return (
    <div>
      <AppAppBar />
      <ProductHero />
      <Plans />
      <PlansDetails />
      <InformationVideo />
      <ReceiveOffers />
      <Footer />
      
    </div>
  );
};

export default HomePage;