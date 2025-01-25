import React from 'react'
import MarketSummary from "./features/marketSummary"
import Overview from "./features/overview"
import Recommendations from './features/recommendations'

const Home1 = () => {
  return (
   <>
    <div >
      
     <MarketSummary />
      <div className="flex lg:flex-row flex-col gap-8 px-6">
       
      <Overview />
<Recommendations />
        
      </div>
    </div>
   </>
  )
}

export default Home1