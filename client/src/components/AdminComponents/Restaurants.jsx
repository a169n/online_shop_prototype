import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import greenStar from "../../assets/greenStar.svg";
import yellowStar from "../../assets/yellowStar.svg";
import regionIcon from "../../assets/region.svg";
import peopleIcon from "../../assets/people.svg";
import { Sidebar } from "./Sidebar";
import {
  useGetRestaurantsQuery,
  useDeleteRestaurantByIdMutation,
  useCreateNewRestaurantMutation,
} from "../../redux/services/restaurantsApi";
import "./AdminComponents.css"; // Import the CSS file for the component
import CreateRestaurantModal from "../AdminModals/CreateRestaurantModal";

export const Restaurants = () => {
  const { data: restaurants, error, isLoading } = useGetRestaurantsQuery();
  const [deleteRestaurantById] = useDeleteRestaurantByIdMutation();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      deleteRestaurantById(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-restaurants">
        {restaurants.map((restaurant) => (
          <div className="hero-section-card" key={restaurant._id}>
            <button
              className="delete-button"
              onClick={() => handleDelete(restaurant._id)}>
              Delete
            </button>
            <Link className="link" to={`/restaurant/${restaurant._id}`}>
              <Slider {...sliderSettings}>
                {restaurant.images.map((image, index) => (
                  <img
                    key={index}
                    className="restaurant-image"
                    src={`http://localhost:3000/${image}`}
                    alt={`restaurant-image-${index}`}
                  />
                ))}
              </Slider>
              <h3 className="card-header">{restaurant.name}</h3>
              <div className="card-info">
                <p className="card-keyword">{restaurant.keywords.join(", ")}</p>
                <div className="card-rating">
                  <div>
                    <img
                      src={restaurant.rating >= 4 ? greenStar : yellowStar}
                      alt={
                        restaurant.rating >= 4 ? "green-star" : "yellow-star"
                      }
                    />
                  </div>
                  <div className="restaurant-rating">
                    {restaurant.rating.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="card-region-container">
                <img src={regionIcon} alt="region" />
                <p className="card-region">{restaurant.region}</p>
              </div>
              <div className="card-region-container">
                <img src={peopleIcon} alt="people" />
                <p className="card-region">{restaurant.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="create-restaurant-button">
        Create Restaurant
      </button>

      {showModal && <CreateRestaurantModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Restaurants;
