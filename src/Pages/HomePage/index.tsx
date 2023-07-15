import React, { useState } from 'react';
import Footer from "../../_component/ui/footer";
import ProductHero from '../../_component/ui/productHero';
import AppAppBar from '../../_component/ui/AppBar';
import Plans from '../../_component/ui/Plans';
import ReceiveOffers from '../../_component/ui/ReceiveOffers';
import InformationVideo from '../../_component/ui/Informaation';

const HomePage = () => {

  return (
    <div>
      <AppAppBar />
      <ProductHero />
      <Plans />
      <InformationVideo />
      <ReceiveOffers />
      <Footer />
    </div>
  );
};

export default HomePage;