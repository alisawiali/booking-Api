import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const images = [];
   const { data, loading, error } = useFetch("/hotels/feautred=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item, i) => (
            <div className="fpItem" key={i._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapstprice}/night
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
