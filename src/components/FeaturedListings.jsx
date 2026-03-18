import ListingCards from './ads/ListingCards';
import { Link } from 'react-router';
const FeaturedListings = ({properties}) => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {properties.map(item => (
            <ListingCards key={item.id} data={item}/>
        ))}
      </div>
    </div>
  );
};
export default FeaturedListings;